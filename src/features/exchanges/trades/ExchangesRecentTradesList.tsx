import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { fetchRecentTradesThunk } from '../exchangesSlice'
import { AssetPair } from '../../../models/assets/AssetPair'
import { RootState } from '../../../app/store'
import SingleExchangePairTrades from '../../../components/trades/SingleExchangePairTrades';
import text from '../../../strings'
// @ts-ignore
import AntDesignIcon from 'react-native-vector-icons/dist/AntDesign'
import AssetPairTrades from '../../../models/assets/AssetPairTrades';
import { horizontalLayout, paddingM1 } from '../../../style/globalStyle';
import { theme } from '../../../style/theme';
import CenteredSpinner from '../../../components/common/CenteredSpinner';
import globalConstants from '../../../style/globalConstants';

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

   const displayedAssetPairTrades = useMemo(
      () => AssetPairTrades.sortAssetPairTrades(assetPairTrades, sortValue), [assetPairTrades, sortValue])


   useEffect(() => {
      if (!props.assetPair) {
         return
      }
      const cb = () => {
         dispatch(fetchRecentTradesThunk(props.assetPair))
      }
      cb();
      const interval = setInterval(cb, 100000)
      return () => clearInterval(interval)
   }, [props.assetPair])


   const getChild = () => {
      if (!displayedAssetPairTrades.length) {
         return <CenteredSpinner/>
      }
      return <>
         <TouchableOpacity
            onPress={() => {
               setSortValue(sortValue === 'asc' ? 'desc' : 'asc')
            }}
            style={[horizontalLayout, styles.sortButton]}>
            <Text>{text.common_price}</Text>
            <AntDesignIcon name={sortValue === 'asc' ? 'caretup' : 'caretdown'}
                           size={30}
                           color={theme.normal.n2}/>
         </TouchableOpacity>
         <View style={styles.exchangesTradesList}>
            {
               displayedAssetPairTrades
                  .map((assetPairTrade, index) => <SingleExchangePairTrades
                     key={index}
                     loading={!assetPairTrade || assetPairTrade.getSupported() === undefined}
                     assetPairTrades={assetPairTrade}
                  />)
            }
         </View>
      </>
   }

   return <View style={styles.wrapper}>
      {getChild()}
   </View>
}
export default ExchangesRecentTradesList

const styles = StyleSheet.create({
   wrapper: {
      flex: 1,
   },
   sortButton: {
      alignSelf: 'center',
      backgroundColor: theme.opposing.o2,
      width: 'auto',
   },
   exchangesTradesList: {
      flex: 1,
      marginTop: globalConstants.layout.distance.m,
   },
})
