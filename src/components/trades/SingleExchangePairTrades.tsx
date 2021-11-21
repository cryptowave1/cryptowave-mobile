import React from 'react'
import { StyleSheet, Text } from 'react-native'
import Trade from '../../models/market/Trade'
import AssetPairTrades from '../../models/assets/AssetPairTrades'
import text from '../../strings'
import getArrayLastItem from '../../utils/functions/getArrayLastItem'
import ElevatedView from '../common/wrappers/ElevatedView'
import Spinner from '../common/Spinner';
import { marginListItemM } from '../../style/globalStyle';
import formatPrice from '../../utils/functions/formatPrice';

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
         return <Text>{formatPrice(lastTrade.getPrice())}</Text>
      }

      return <Text>{text.exchange_trades_pair_not_supported}</Text>
   }

   return <ElevatedView style={[styles.wrapper, marginListItemM]}>
      {getChild()}
   </ElevatedView>
}
export default SingleExchangePairTrades

const styles = StyleSheet.create({
   wrapper: {
      flex: 1,
      height: 400, // todo animated
   },
})
