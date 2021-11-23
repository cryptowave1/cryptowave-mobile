import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import { fetchRecentTradesThunk } from '../exchangesSlice'
import { AssetPair } from '../../../models/assets/AssetPair'
import { RootState } from '../../../app/store'
import SingleExchangePairTrades from '../../../components/trades/SingleExchangePairTrades'
import strings from '../../../strings'
// @ts-ignore
import IoniconsIcon from 'react-native-vector-icons/dist/Ionicons'
import {
   boldText,
   centerAligned,
   flex,
   horizontalLayout,
   middleAligned,
   paddingL,
   paddingS, textO1
} from '../../../style/globalStyle'
import { theme } from '../../../style/theme'
import globalConstants from '../../../style/globalConstants'
import ExchangeTrades from '../../../models/exchanges/ExchangeTrades'
import AssetPairTrades from '../../../models/assets/AssetPairTrades'
import {
   RECENT_TRADES_CONTAINER_HEIGHT_MAX,
   RECENT_TRADES_CONTAINER_HEIGHT_MIN,
   RECENT_TRADES_POLLING_INTERVAL_MS
} from '../../constants'
import Animated, { Easing, withTiming } from 'react-native-reanimated'

interface Props {
   style?: ViewStyle
   assetPair: AssetPair
   sharedExpandableViewHeight: Animated.SharedValue<number>
}

type SortValue = 'asc' | 'desc'

const ExchangesRecentTradesList: React.FC<Props> = (props: Props) => {
   const dispatch = useDispatch()

   const [sortValue, setSortValue] = useState<SortValue>('desc')

   const exchangeTrades: ExchangeTrades[] = useSelector((state: RootState) =>
      Object.values(state.exchanges.exchangeIdToExchangeTrades))

   const assetPairTicker = props.assetPair.toTicker()

   const displayedExchangeTrades: ExchangeTrades[] = useMemo(
      () => exchangeTrades
         .sort((left, right) => AssetPairTrades.getComparatorValue(
            left.getAssetPairTrades(assetPairTicker),
            right.getAssetPairTrades(assetPairTicker),
            sortValue))
      , [exchangeTrades, sortValue])

   useEffect(() => {
      const hasOneLastTrade = displayedExchangeTrades
         .some(exchangeTrade => exchangeTrade.getAssetPairTrades(assetPairTicker)?.getLastNTrades(1).length)

      props.sharedExpandableViewHeight.value = withTiming(hasOneLastTrade
         ? RECENT_TRADES_CONTAINER_HEIGHT_MAX
         : RECENT_TRADES_CONTAINER_HEIGHT_MIN, {
         duration: 1000,
         easing: Easing.out(Easing.exp),
      })
   }, [props.assetPair])

   useEffect(() => {
      if (!props.assetPair) {
         return
      }
      const cb = () => {
         dispatch(fetchRecentTradesThunk(props.assetPair))
      }
      cb()
      const interval = setInterval(cb, RECENT_TRADES_POLLING_INTERVAL_MS)
      return () => clearInterval(interval)
   }, [props.assetPair])


   const getChild = () => {
      return <>
         <TouchableOpacity
            onPress={() => {
               setSortValue(sortValue === 'asc' ? 'desc' : 'asc')
            }}
            style={styles.sortButton}>
            <Text style={styles.sortButtonText}>{strings.common_price.toUpperCase()}</Text>
            <IoniconsIcon name={sortValue === 'asc' ? 'caret-up-outline' : 'caret-down-outline'}
                          size={globalConstants.icons.size.m}
                          color={theme.opposing.o1}/>
         </TouchableOpacity>
         <View style={styles.exchangesTradesList}>
            {
               displayedExchangeTrades
                  .map((exchangeTrades, index) => <SingleExchangePairTrades
                     key={index}
                     exchange={exchangeTrades.getExchange()}
                     loading={!exchangeTrades.getAssetPairTrades(assetPairTicker) ||
                     exchangeTrades.getAssetPairTrades(assetPairTicker)!.getSupported() === undefined}
                     assetPairTrades={exchangeTrades.getAssetPairTrades(assetPairTicker)}
                     sharedExpandableViewHeight={props.sharedExpandableViewHeight}
                  />)
            }
         </View>
      </>
   }

   return <View style={[styles.wrapper, props.style]}>
      {getChild()}
   </View>
}
export default ExchangesRecentTradesList

const styles = StyleSheet.create({
   wrapper: {
      ...flex,
   },
   sortButton: {
      ...horizontalLayout,
      ...centerAligned,
      ...middleAligned,
      ...paddingS,
      alignSelf: 'center',
      width: 'auto',
   },
   sortButtonText: {
      ...textO1,
      ...boldText
   },
   exchangesTradesList: {
      ...flex,
      ...paddingL,
      paddingTop: 0,
      marginTop: globalConstants.layout.distance.m,
   },
})
