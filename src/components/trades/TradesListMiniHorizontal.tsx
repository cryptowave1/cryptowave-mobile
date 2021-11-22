import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import Trade from '../../models/market/Trade';
import { theme } from '../../style/theme';
import { borderColorN2, centerAligned, middleAligned, textN1 } from '../../style/globalStyle';
import formatPrice from '../../utils/functions/formatPrice';
import { TRADES_LIST_MINI_CONTAINER_HEIGHT_MAX } from '../../features/constants';

interface Props {
   trades: Trade[]
}

const SingleTrade = ({trade}: { trade: Trade }) => {
   const color = trade.getType() === 'b' ? theme.complementary.c1.first : theme.complementary.c1.second
   return <View style={[{backgroundColor: color}, styles.tradeWrapper]}>
      <Text style={{...textN1}}>{formatPrice(trade.getPrice())}</Text>
      <Text style={{...textN1}}>{trade.getBaseQty()}</Text>
   </View>
}

const TradesListMiniHorizontal: React.FC<Props> = (props: Props) => {
   return <FlatList
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
      width: 100,
      height: TRADES_LIST_MINI_CONTAINER_HEIGHT_MAX,
   }
})
