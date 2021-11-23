import React from 'react'
import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import Trade from '../../models/market/Trade'
import {
   boldText,
   horizontalLayout,
   middleAligned,
   paddingS,
   text,
   textN1
} from '../../style/globalStyle'
import { theme } from '../../style/theme'
import formatNumber from '../../utils/functions/formatNumber'
import globalConstants from '../../style/globalConstants'
import strings from '../../strings'

interface Props {
   trade: Trade
}

const SingleTradeListItem: React.FC<Props> = (props: Props) => {
   const tradeWrapperStyle: ViewStyle = props.trade.getType() === 'b'
      ? {backgroundColor: theme.complementary.c1.first}
      : {backgroundColor: theme.complementary.c1.second}

   return <View style={[styles.tradeWrapper, tradeWrapperStyle, horizontalLayout]}>
      <View>
         <Text style={{...textN1, ...boldText}}>
            {props.trade.getType().toUpperCase()}
         </Text>
      </View>
      <View style={styles.priceWrapper}>
         <Text style={[textN1]}>{strings.common_price}:</Text>
      </View>
      <View>
         <Text style={{...textN1, ...boldText}}>
            {formatNumber(props.trade.getPrice())}
         </Text>
      </View>
      <View style={styles.qtyWrapper}>
         <Text style={{...textN1, ...boldText}}>
            <Text style={{...text}}>{`${strings.common_qty}:  `}</Text>
            {formatNumber(props.trade.getBaseQty())}
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
   priceWrapper: {
      marginLeft: globalConstants.layout.distance.m,
      marginRight: globalConstants.layout.distance.m,
   },
   qtyWrapper: {
      ...middleAligned,
      position: 'absolute',
      top: 4,
      right: globalConstants.layout.distance.m,
      width: 90
   }
})
