import React, { useEffect, useMemo, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import Trade from '../../models/market/Trade'
import AssetPairTrades from '../../models/assets/AssetPairTrades'
import strings from '../../strings'
import getArrayLastItem from '../../utils/functions/getArrayLastItem'
import ElevatedView from '../common/wrappers/ElevatedView'
import Spinner from '../common/Spinner'
import {
   bgO1,
   centerAligned,
   flex, horizontalLayout, lightText,
   marginListItemL,
   roundedCornerM,
   textN1, textO1,
} from '../../style/globalStyle'
import formatNumber from '../../utils/functions/formatNumber'
import globalConstants from '../../style/globalConstants'
import Exchange from '../../models/exchanges/Exchange'
import { useNavigation } from '@react-navigation/native'
import { HomeScreenProps } from '../../router/routes'
import { theme } from '../../style/theme'
// @ts-ignore
import Ionicons from 'react-native-vector-icons/dist/Ionicons'
import TradesListMiniHorizontal from './TradesListMiniHorizontal'
import Animated, { Easing, interpolate, useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated'
import {
   RECENT_TRADES_CONTAINER_HEIGHT_MAX,
   RECENT_TRADES_CONTAINER_HEIGHT_MIN,
   TRADES_LIST_HORIZONTAL_CONTAINER_HEIGHT_MAX, TRADES_LIST_HORIZONTAL_MAX_ELEMENTS
} from '../../features/featuresConstants'

interface Props {
   loading: boolean
   exchange: Exchange
   assetPairTrades: AssetPairTrades | undefined
   sharedExpandableViewHeight: Animated.SharedValue<number>
}

const SingleExchangePairTrades: React.FC<Props> = (props: Props) => {
   const navigation: HomeScreenProps['navigation'] = useNavigation()

   const [lastTradePrice, setLastTradePRice] = useState<number>(0)

   const expandableViewHeight: Animated.SharedValue<number> = useDerivedValue(() => {
      return props.sharedExpandableViewHeight.value
   }, [props.sharedExpandableViewHeight.value])

   const tradesListStyle: ViewStyle = useAnimatedStyle(() => ({
      height: interpolate(expandableViewHeight.value,
         [0, RECENT_TRADES_CONTAINER_HEIGHT_MIN, RECENT_TRADES_CONTAINER_HEIGHT_MAX],
         [0, 0, TRADES_LIST_HORIZONTAL_CONTAINER_HEIGHT_MAX]),
      opacity: interpolate(expandableViewHeight.value,
         [0,
            RECENT_TRADES_CONTAINER_HEIGHT_MIN,
            (RECENT_TRADES_CONTAINER_HEIGHT_MAX + RECENT_TRADES_CONTAINER_HEIGHT_MIN) / 2,
            RECENT_TRADES_CONTAINER_HEIGHT_MAX],
         [0, 0, 0.7, 1])
   }), [expandableViewHeight.value])

   const isPriceUp: boolean = useMemo(() => {
      let result: boolean
      if (!props.assetPairTrades?.getLastPrice()) {
         result = false
      } else {
         result = props.assetPairTrades!.getLastPrice()! > lastTradePrice
      }
      if (props.assetPairTrades?.getLastPrice()) {
         setLastTradePRice(props.assetPairTrades?.getLastPrice()!)
      }
      return result
   }, [props.assetPairTrades])


   const getPriceComponent = (price: number, isPriceUp: boolean) => {
      const color = isPriceUp ? theme.complementary.c1.first : theme.complementary.c1.second

      return <View style={[styles.priceWrapper, horizontalLayout, centerAligned]}>
         <Ionicons color={color} size={20} name={isPriceUp ? 'arrow-up-sharp' : 'arrow-down-sharp'}/>
         <Text style={[styles.priceText, {
            color: color
         }]}>{formatNumber(price)}</Text>
      </View>
   }

   let hasLastTrade = false
   let child
   const spinner = <Spinner/>
   if (props.loading || !props.assetPairTrades) {
      child = spinner
   } else if (props.assetPairTrades.getSupported()) {
      const lastTrade: Trade | undefined = getArrayLastItem(props.assetPairTrades.getTrades())
      if (!lastTrade) {
         child = spinner
      } else {
         hasLastTrade = true
         child = <View style={styles.tradeDataWrapper}>
            {getPriceComponent(lastTrade.getPrice(), isPriceUp)}
            <Animated.View style={[tradesListStyle, styles.miniRecentTradesWrapper]}>
               <TradesListMiniHorizontal style={{...roundedCornerM}}
                                         trades={props.assetPairTrades.getLastNTrades(TRADES_LIST_HORIZONTAL_MAX_ELEMENTS)}/>
            </Animated.View>
         </View>
      }
   } else {
      child = <Text style={styles.notSupported}>{strings.exchange_trades_pair_not_supported}</Text>
   }

   return <TouchableOpacity
      style={{...flex}}
      onPress={() => {
         if (!hasLastTrade) {
            return
         }
         navigation.navigate('DetailsScreen', {
            exchange: props.exchange,
            assetPair: props.assetPairTrades!.getAssetPair()!
         })
      }}>
      <ElevatedView
         elevation={15}
         outerViewStyle={{...flex, ...marginListItemL}}>
         <View style={[styles.innerWrapper, {justifyContent: hasLastTrade ? 'flex-end' : 'center'}]}>
            <Text style={styles.exchangeText}>{props.exchange.getName()}</Text>
            {child}
         </View>
      </ElevatedView>
   </TouchableOpacity>
}
export default SingleExchangePairTrades

const styles = StyleSheet.create({
   innerWrapper: {
      ...centerAligned,
      ...bgO1,
      ...flex,
      ...roundedCornerM,
      backgroundColor: theme.normal.n3,
   },
   exchangeText: {
      ...textO1,
      ...lightText,
      position: 'absolute',
      top: globalConstants.layout.distance.xs,
   },
   priceWrapper: {
      top: globalConstants.layout.distance.s
   },
   priceText: {
      ...textN1,
      marginLeft: globalConstants.layout.distance.s,
      fontSize: 17,
   },
   notSupported: {
      ...textO1,
      marginTop: globalConstants.layout.distance.s
   },
   tradeDataWrapper: {
      ...flex,
      ...centerAligned,
      justifyContent: 'flex-end'
   },
   miniRecentTradesWrapper: {
      marginTop: globalConstants.layout.distance.m,
   },
})
