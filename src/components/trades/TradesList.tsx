import React from 'react'
import { FlatList, ViewStyle } from 'react-native'
import AssetPairTrades from '../../models/assets/AssetPairTrades'
import ElevatedView from '../common/wrappers/ElevatedView'
import {
   flex,
   paddingL
} from '../../style/globalStyle'
import SingleTradeListItem from './SingleTradeListItem'

interface Props {
   assetPairTrades: AssetPairTrades
   style?: ViewStyle
}

const TradesList: React.FC<Props> = (props: Props) => {
   return <ElevatedView outerViewStyle={[{...flex, ...paddingL}, props.style || {}]}>
      <FlatList
         data={[...props.assetPairTrades.getTrades()].reverse()}
         renderItem={({item}) => <SingleTradeListItem key={item.getTimestamp()} trade={item}/>}
      />
   </ElevatedView>
}
export default TradesList
