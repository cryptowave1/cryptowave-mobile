import React from 'react'
import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import Trade from '../../models/market/Trade';
import { boldText, horizontalLayout, paddingS, text, textN1 } from '../../style/globalStyle';
import { theme } from '../../style/theme';
import formatPrice from '../../utils/functions/formatPrice';
import globalConstants from '../../style/globalConstants';

interface Props {
   trade: Trade
}

const SingleTradeListItem: React.FC<Props> = (props: Props) => {
   console.log(props.trade.getType())
   const tradeWrapperStyle: ViewStyle = props.trade.getType() === 'b'
      ? {backgroundColor: theme.complementary.c1.first}
      : {backgroundColor: theme.complementary.c1.second}

   return <View style={[styles.tradeWrapper, tradeWrapperStyle, horizontalLayout]}>
      <Text style={{...textN1, ...boldText}}>
         {props.trade.getType().toUpperCase()}
         <Text style={{...text}}>{'         Price: '}</Text>
         {formatPrice(props.trade.getPrice())}
      </Text>
      <View style={styles.qtyWrapper}>
         <Text style={{...textN1, ...boldText}}>
            <Text style={{...text}}>{'Qty: '}</Text>
            {formatPrice(props.trade.getBaseQty())}
         </Text>
      </View>
   </View>
}

export default React.memo(SingleTradeListItem)

const styles = StyleSheet.create({
   tradeWrapper: {
      ...paddingS,
      backgroundColor: 'red',
   },
   qtyWrapper: {
      position: 'absolute',
      right: globalConstants.layout.distance.m,
      // backgroundColor: 'blue',
      width: 90
   }
})
