import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Trade from '../../models/market/Trade'
import AssetPairTrades from '../../models/assets/AssetPairTrades'
import text, { locale } from '../../text'
import commonConstants from '../../style/commonConstants'
import getArrayLastItem from '../../utils/functions/getArrayLastItem'
import ElevatedView from '../common/wrappers/ElevatedView'
import Spinner from '../common/Spinner';

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
         const lastTradePriceString: string = new Intl.NumberFormat(locale).format(lastTrade.getPrice())
         return <Text>{lastTradePriceString}</Text>
      }

      return <Text>{text.exchange_trades_pair_not_supported}</Text>
   }

   return <ElevatedView style={styles.wrapper}>
      {getChild()}
   </ElevatedView>
}
export default SingleExchangePairTrades

const styles = StyleSheet.create({
   wrapper: {
      width: '100%',
      height: commonConstants.asset.pairTrade.homeScreen.initialHeight, // todo animated
   },
})
