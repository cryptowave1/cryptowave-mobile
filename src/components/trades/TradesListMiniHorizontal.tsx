import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import Trade from '../../models/market/Trade';
import { theme } from '../../style/theme';
import globalConstants from '../../style/globalConstants';


interface Props {
   trades: Trade[]
}

const SingleTrade = ({trade}: { trade: Trade }) => {
   const color = trade.getType() === 'b' ? theme.complementary.c1.first : theme.complementary.c1.second
   return <View style={[{backgroundColor: color}, styles.tradeWrapper]}>
      <Text>{trade.getPrice()}</Text>
   </View>
}

const TradesListMiniHorizontal: React.FC<Props> = (props: Props) => {
   return <FlatList
      data={[...props.trades].reverse().slice(0, 10)}
      renderItem={({item}) => (
         <SingleTrade trade={item}/>
      )}
      horizontal={true}/>
}

export default TradesListMiniHorizontal

const styles = StyleSheet.create({
   tradeWrapper: {
      width: 20,
      margin: globalConstants.layout.distance.m
   }
})
