import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Trade from '../../models/market/Trade'
import {
   boldText, centerAligned,
   horizontalLayout,
   paddingS, text,
   textO1
} from '../../style/globalStyle'
import { theme } from '../../style/theme'
import formatNumber from '../../utils/functions/formatNumber'
import globalConstants from '../../style/globalConstants'
import getPreciseTime from '../../utils/functions/getPrciseTime';

interface Props {
   trade: Trade
}

const SingleTradeListItem: React.FC<Props> = (props: Props) => {
   const priceColor: string = props.trade.getType() === 'b'
      ? theme.complementary.c1.first
      : theme.complementary.c1.second


   return <View style={[styles.tradeWrapper, horizontalLayout]}>
      <View style={styles.priceWrapper}>
         <Text style={[text, boldText, {color: priceColor}]}>
            {formatNumber(props.trade.getPrice())}
         </Text>
      </View>
      <View style={styles.amountWrapper}>
         <Text style={[textO1]}>
            {formatNumber(props.trade.getBaseQty())}
         </Text>
      </View>
      <View style={styles.timeWrapper}>
         <Text style={[textO1]}>
            {getPreciseTime(props.trade.getTimestamp())}
         </Text>
      </View>
   </View>
}

export default SingleTradeListItem

const styles = StyleSheet.create({
   tradeWrapper: {
      ...paddingS,
      ...centerAligned,
   },
   priceWrapper: {
      width: 90,
      marginLeft: globalConstants.layout.distance.m,
      marginRight: globalConstants.layout.distance.m,
   },
   amountWrapper: {
      width: 100,
      marginLeft: globalConstants.layout.distance.m,
      marginRight: globalConstants.layout.distance.m,
   },
   timeWrapper: {
      width: 80,
      position: 'absolute',
      right: 0
   }
})
