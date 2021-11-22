import React, { useMemo, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Trade from '../../models/market/Trade'
import AssetPairTrades from '../../models/assets/AssetPairTrades'
import text from '../../strings'
import getArrayLastItem from '../../utils/functions/getArrayLastItem'
import ElevatedView from '../common/wrappers/ElevatedView'
import Spinner from '../common/Spinner'
import {
   bgO1,
   centerAligned,
   flex, horizontalLayout, lightText,
   marginListItemL,
   middleAligned,
   textN1,
} from '../../style/globalStyle'
import formatPrice from '../../utils/functions/formatPrice'
import globalConstants from '../../style/globalConstants'
import Exchange from '../../models/exchanges/Exchange'
import { useNavigation } from '@react-navigation/native'
import { HomeScreenProps } from '../../router/routes'
import { theme } from '../../style/theme';
// @ts-ignore
import Ionicons from 'react-native-vector-icons/dist/Ionicons'

interface Props {
   loading: boolean
   exchange: Exchange
   assetPairTrades: AssetPairTrades | undefined
}

const SingleExchangePairTrades: React.FC<Props> = (props: Props) => {
   const navigation: HomeScreenProps['navigation'] = useNavigation()

   const [lastTradePrice, setLastTradePRice] = useState<number>(0)

   const isPriceUp: boolean = useMemo(() => {
      let result: boolean;
      if (!props.assetPairTrades?.getLastPrice()) {
         result = false
      } else {
         result = props.assetPairTrades!.getLastPrice()! > lastTradePrice
      }
      if (props.assetPairTrades?.getLastPrice()) {
         console.log(props.assetPairTrades?.getLastPrice())
         setLastTradePRice(props.assetPairTrades?.getLastPrice()!)
      }
      return result
   }, [props.assetPairTrades])

   const getPriceComponent = (price: number, isPriceUp: boolean) => {
      const color = isPriceUp ? theme.complementary.c1.first : theme.complementary.c1.second

      return <View style={[styles.priceWrapper, horizontalLayout, centerAligned]}>
         <Ionicons color={color} size={23} name={isPriceUp ? 'arrow-up-sharp' : 'arrow-down-sharp'}/>
         <Text style={[styles.priceText, {
            color: color
         }]}>{formatPrice(price)}</Text>
      </View>
   }

   let canNavigate = false
   let child
   const spinner = <Spinner/>
   if (props.loading || !props.assetPairTrades) {
      child = spinner
   } else if (props.assetPairTrades.getSupported()) {
      const lastTrade: Trade | undefined = getArrayLastItem(props.assetPairTrades.getTrades())
      if (!lastTrade) {
         child = spinner
      } else {
         canNavigate = true
         child = getPriceComponent(lastTrade.getPrice(), isPriceUp)
      }
   } else {
      child = <Text style={styles.notSupported}>{text.exchange_trades_pair_not_supported}</Text>
   }

   return <TouchableOpacity
      style={{...flex}}
      onPress={() => {
         if (!canNavigate) {
            return
         }
         navigation.navigate('DetailsScreen', {
            exchange: props.exchange,
            assetPair: props.assetPairTrades!.getAssetPair()!
         })
      }}>
      <ElevatedView
         elevation={15}
         outerViewStyle={{...flex, ...marginListItemL}}
         innerViewStyle={styles.innerWrapper}>
         <View style={styles.innerWrapper}>
            <>
               <Text style={styles.exchangeText}>{props.exchange.getName()}</Text>
               {child}
            </>
         </View>
      </ElevatedView>
   </TouchableOpacity>
}
export default SingleExchangePairTrades

const styles = StyleSheet.create({
   innerWrapper: {
      ...centerAligned,
      ...middleAligned,
      ...bgO1,
      ...flex
   },
   exchangeText: {
      ...textN1,
      ...lightText,
      position: 'absolute',
      top: globalConstants.layout.distance.xs,
   },
   priceWrapper: {},
   priceText: {
      ...textN1,
      marginLeft: globalConstants.layout.distance.s,
      fontSize: 20
   },
   notSupported: {
      ...textN1,
   }
})
