import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { fetchRecentTradesThunk } from '../exchangesSlice'
import { AssetPair } from '../../../models/assets/AssetPair'
import { RootState } from '../../../app/store'
import commonConstants from '../../../style/commonConstants';
import SingleExchangePairTrades from '../../../components/trades/SingleExchangePairTrades';
import text from '../../../text'

// @ts-ignore
import AntDesignIcon from 'react-native-vector-icons/dist/AntDesign'
import AssetPairTrades from '../../../models/assets/AssetPairTrades';
import { horizontalLayout } from '../../../style/globalStyle';
import { theme } from '../../../style/theme';

interface Props {
   assetPair: AssetPair
}

type SortValue = 'asc' | 'desc'

const ExchangesRecentTradesList: React.FC<Props> = (props: Props) => {
   const dispatch = useDispatch()

   const [sortValue, setSortValue] = useState<SortValue>('asc')

   const assetPairTrades: (AssetPairTrades | undefined)[] = useSelector((state: RootState) =>
      Object.values(state.exchanges.exchangeIdToExchangeTrades)
         .map(obj => obj.getAssetPairTrades(props.assetPair.toTicker())))

   const sortTrades = (assets: (AssetPairTrades | undefined)[], sortValue: SortValue): (AssetPairTrades | undefined)[] => {
      return assetPairTrades
         .filter(trades => !!trades)
         .sort((left: (AssetPairTrades | undefined), right: (AssetPairTrades | undefined)) => {
            if (!left?.getLastPrice() && !right?.getLastPrice()) {
               return 0
            }
            if (!left?.getLastPrice()) {
               return -1
            }
            if (!right?.getLastPrice()) {
               return 1
            }
            if (sortValue === 'asc') {
               return left.getLastPrice()! - right.getLastPrice()!
            }
            return right.getLastPrice()! - left.getLastPrice()!
         })
   }
   const displayedAssetPairTrades = useMemo(
      () => sortTrades(assetPairTrades, sortValue), [assetPairTrades, sortValue])

   useEffect(() => {
      if (!props.assetPair) {
         return
      }
      const interval = setInterval(() => {
         dispatch(fetchRecentTradesThunk(props.assetPair))
      }, 3000)
      return () => clearInterval(interval)
   }, [props.assetPair])

   return <View style={style.wrapper}>
      <TouchableOpacity
         onPress={() => {
            setSortValue(sortValue === 'asc' ? 'desc' : 'asc')
         }}
         style={[horizontalLayout, style.sortButton]}>
         <Text>{text.common_price}</Text>
         <AntDesignIcon name={sortValue === 'asc' ? 'caretup' : 'caretdown'}
                        size={30}
                        color={theme.trades.sortButton.iconColor}/>
      </TouchableOpacity>
      {
         displayedAssetPairTrades
            .map((assetPairTrade, index) => {
               return <SingleExchangePairTrades
                  key={index}
                  loading={!assetPairTrade || assetPairTrade.getSupported() === undefined}
                  assetPairTrades={assetPairTrade}
               />
            })
      }
   </View>
}
export default ExchangesRecentTradesList

const style = StyleSheet.create({
   wrapper: {
      flex: 1,
      padding: commonConstants.layout.distance.medium,
   },
   sortButton: {
      alignSelf: 'center',
      backgroundColor: theme.trades.sortButton.background,
      width: 'auto',
   },
})
