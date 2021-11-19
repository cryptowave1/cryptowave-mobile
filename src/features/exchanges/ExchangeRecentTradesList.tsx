import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet, View } from 'react-native'
import { fetchRecentTradesThunk } from './exchangesReducer'
import { AssetPair } from '../../models/assets/AssetPair'
import { RootState } from '../../app/store'
import SingleExchangePairTradesComponent from './SingleExchangePairTradesComponent'

interface Props {
   assetPair: AssetPair
}

const ExchangesRecentTradesList: React.FC<Props> = (props: Props) => {
   const dispatch = useDispatch()

   const exchanges = useSelector((state: RootState) => {
      return Object.entries(state.exchanges).map(entry => entry[1].exchange)
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
      {
         exchanges.map(exchange => {
            return <SingleExchangePairTradesComponent
               key={`${exchange.getId()}${props.assetPair.toString()}`}
               exchange={exchange}
               assetPair={props.assetPair}
            />
         })
      }
   </View>
}
export default ExchangesRecentTradesList

const style = StyleSheet.create({
   wrapper: {
      flex: 1,
   },
})
