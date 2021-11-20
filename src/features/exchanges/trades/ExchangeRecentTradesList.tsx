import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { fetchRecentTradesThunk } from '../exchangesSlice'
import { AssetPair } from '../../../models/assets/AssetPair'
import { RootState } from '../../../app/store'
import commonConstants from '../../../style/commonConstants';
import SingleExchangePairTrades from '../../../components/trades/SingleExchangePairTrades';
import text from '../../../text'

interface Props {
   assetPair: AssetPair
}

type SortValue = 'asc' | 'desc'

const ExchangesRecentTradesList: React.FC<Props> = (props: Props) => {
   const dispatch = useDispatch()

   const [sortValue, setSortValue] = useState<SortValue>('asc')

   const assetPairTrades = useSelector((state: RootState) => {
      return Object.values(state.exchanges.exchangeIdToExchangeTrades).map(obj => obj.getAssetPairTrades(props.assetPair.toTicker()))
   })

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
      <TouchableOpacity>
         <Text>{text.common_price}</Text>
      </TouchableOpacity>
      {
         assetPairTrades
            .sort()
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
      padding: commonConstants.layout.distance.medium
   },
})
