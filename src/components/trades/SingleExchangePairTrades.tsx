import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Trade from '../../models/market/Trade'
import AssetPairTrades from '../../models/assets/AssetPairTrades'
import text from '../../strings'
import getArrayLastItem from '../../utils/functions/getArrayLastItem'
import ElevatedView from '../common/wrappers/ElevatedView'
import Spinner from '../common/Spinner'
import {
   bgO1,
   centerAligned,
   flex,
   marginListItemL,
   middleAligned,
   textN1,
} from '../../style/globalStyle'
import formatPrice from '../../utils/functions/formatPrice'
import globalConstants from '../../style/globalConstants'
import Exchange from '../../models/exchanges/Exchange';

interface Props {
   loading: boolean
   exchange: Exchange
   assetPairTrades: AssetPairTrades | undefined
}

const SingleExchangePairTrades: React.FC<Props> = (props: Props) => {
   const getChild = () => {
      const spinner = <Spinner/>

      if (props.loading || !props.assetPairTrades) {
         return spinner
      }

      if (props.assetPairTrades.getSupported()) {
         const lastTrade: Trade | undefined = getArrayLastItem(props.assetPairTrades.getTrades())
         if (!lastTrade) {
            return spinner
         }
         return <View style={styles.priceWrapper}>
            <Text style={styles.priceText}>{formatPrice(lastTrade.getPrice())}</Text>
         </View>
      }
      return <Text style={styles.notSupported}>{text.exchange_trades_pair_not_supported}</Text>
   }

   return <ElevatedView elevation={globalConstants.elevation.s} style={styles.wrapper}>
      <Text style={styles.exchangeText}>{props.exchange.getName()}</Text>
      {getChild()}
   </ElevatedView>
}
export default SingleExchangePairTrades

const styles = StyleSheet.create({
   wrapper: {
      ...centerAligned,
      ...middleAligned,
      ...marginListItemL,
      ...bgO1,
      ...flex,
   },
   exchangeText: {
      ...textN1,
      position: 'absolute',
      top: globalConstants.layout.distance.xs,
   },
   priceWrapper: {
      // backgroundColor: 'red'
   },
   priceText: {
      ...textN1,
   },
   notSupported: {
      ...textN1,
   }
})
