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

   const displayedExchangeTrades: ExchangeTrades[] = useMemo(
      () => exchangeTrades
         .sort((left, right) => AssetPairTrades.getComparatorValue(
            left.getAssetPairTrades(props.assetPair),
            right.getAssetPairTrades(props.assetPair),
            sortValue))
      , [exchangeTrades, sortValue])

   const areAllExchangeTradesLoaded = displayedExchangeTrades
      .every(exchangeTrades => !!exchangeTrades.getAssetPairTrades(props.assetPair) &&
         !exchangeTrades.getAssetPairTrades(props.assetPair)!.isLoading())

   useEffect(() => {
      let conditionWait = setInterval(() => {
         if (areAllExchangeTradesLoaded) {
            clearInterval(conditionWait);
            // VERY HACKY SOLUTION TO A NASTY REANIMATED BUG todo akolov: find a way to fix this
            props.sharedExpandableViewHeight.value = withTiming(
               props.sharedExpandableViewHeight.value - 0.1, {duration: 10})
            props.sharedExpandableViewHeight.value = withTiming(
               props.sharedExpandableViewHeight.value + 0.1, {duration: 10})
         }
      }, 10)
   }, [props.assetPair, areAllExchangeTradesLoaded])

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
                     loading={!!exchangeTrades.getAssetPairTrades(props.assetPair)?.isLoading()}
                     assetPairTrades={exchangeTrades.getAssetPairTrades(props.assetPair)}
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
