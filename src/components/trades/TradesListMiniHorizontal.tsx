import React from 'react'
import { FlatList, StyleSheet, Text, View, ViewStyle } from 'react-native'
import Trade from '../../models/market/Trade'
import { theme } from '../../style/theme'
import { borderColorN2, centerAligned, middleAligned, textN1 } from '../../style/globalStyle'
import formatNumber from '../../utils/functions/formatNumber'
import { TRADES_LIST_HORIZONTAL_CONTAINER_HEIGHT_MAX } from '../../features/featuresConstants'

const SingleTrade = ({trade}: { trade: Trade }) => {
   const color = trade.getType() === 'b' ? theme.complementary.c1.first : theme.complementary.c1.second
   return <View style={[{backgroundColor: color}, styles.tradeWrapper]}>
      <Text style={{...textN1}}>{formatNumber(trade.getPrice())}</Text>
      <Text style={{...textN1}}>{formatNumber(trade.getBaseQty())}</Text>
   </View>
}

interface Props {
   trades: Trade[]
   style?: ViewStyle
}

const TradesListMiniHorizontal: React.FC<Props> = (props: Props) => {
   return <FlatList
      style={props.style}
      inverted={true}
      data={[...props.trades].reverse()}
      renderItem={({item}) => (
         <SingleTrade trade={item}/>
      )}
      horizontal={true}/>
}
export default TradesListMiniHorizontal

const styles = StyleSheet.create({
   tradeWrapper: {
      ...borderColorN2,
      ...centerAligned,
      ...middleAligned,
      width: 95,
      height: TRADES_LIST_HORIZONTAL_CONTAINER_HEIGHT_MAX,
   }
})
