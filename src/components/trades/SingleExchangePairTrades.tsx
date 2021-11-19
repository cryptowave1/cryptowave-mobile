import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Trade from '../../models/market/Trade'
import AssetPairTrades from '../../models/assets/AssetPairTrades'
import text from '../../text'
import commonConstants from '../../style/commonConstants'
import getArrayLastItem from '../../utils/functions/getArrayLastItem'
import ElevatedView from '../common/wrappers/ElevatedView'

interface Props {
   assetPairTrades: AssetPairTrades
}

const SingleExchangePairTrades: React.FC<Props> = (props: Props) => {
   const isSuported = props.assetPairTrades.getSupported()

   let child
   if (isSuported) {
      const lastTrade: Trade | undefined = getArrayLastItem(props.assetPairTrades.getTrades())
      if (!lastTrade) {
         return null
      }
      const lastTradePriceString: string = new Intl.NumberFormat('de-DE').format(lastTrade.getPrice())
      child = <Text>{lastTradePriceString}</Text>
   } else {
      child = <Text>{text.exchange_trades_pair_not_supported}</Text>
   }

   return <ElevatedView style={styles.wrapper}>
      {child}
   </ElevatedView>
}
export default SingleExchangePairTrades

const styles = StyleSheet.create({
   wrapper: {
      width: '100%',
      height: commonConstants.asset.pairTrade.homeScreen.initialHeight, // todo animated
   },
})
