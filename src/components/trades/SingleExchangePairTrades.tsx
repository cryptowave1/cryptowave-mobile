import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Trade from '../../models/market/Trade'
import AssetPairTrades from '../../models/assets/AssetPairTrades'
import text from '../../strings'
import getArrayLastItem from '../../utils/functions/getArrayLastItem'
import ElevatedView from '../common/wrappers/ElevatedView'
import Spinner from '../common/Spinner'
import { bgO2, flex, marginListItemM, roundedCornerM, roundedCornerS } from '../../style/globalStyle'
import formatPrice from '../../utils/functions/formatPrice'
import globalConstants from '../../style/globalConstants'

interface Props {
   loading: boolean
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
         return <View style={styles.price}>
            <Text>{formatPrice(lastTrade.getPrice())}</Text>
         </View>
      }

      return <Text>{text.exchange_trades_pair_not_supported}</Text>
   }

   return <ElevatedView elevation={globalConstants.elevation.s} style={styles.wrapper}>
      {getChild()}
   </ElevatedView>
}
export default SingleExchangePairTrades

const styles = StyleSheet.create({
   wrapper: {
      ...marginListItemM,
      ...bgO2,
      ...roundedCornerM,
      ...flex,
   },
   price: {
      ...flex,
   }
})
