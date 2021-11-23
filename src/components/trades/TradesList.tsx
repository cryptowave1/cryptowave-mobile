import React from 'react'
import { FlatList, StyleSheet, ViewStyle } from 'react-native'
import AssetPairTrades from '../../models/assets/AssetPairTrades'
import ElevatedView from '../common/wrappers/ElevatedView'
import {
   bgN3,
   paddingL, roundedCornerM
} from '../../style/globalStyle'
import SingleTradeListItem from './SingleTradeListItem'

interface Props {
   assetPairTrades: AssetPairTrades
   style?: ViewStyle
}

const TradesList: React.FC<Props> = (props: Props) => {
   return <ElevatedView outerViewStyle={[{...paddingL}, props.style || {}]}>
      <FlatList
         style={styles.flatList}
         data={[...props.assetPairTrades.getTrades()].reverse()}
         renderItem={({item}) => <SingleTradeListItem trade={item}/>}
      />
   </ElevatedView>
}
export default TradesList

const styles = StyleSheet.create({
   flatList: {
      ...roundedCornerM,
      ...bgN3
   }
})
