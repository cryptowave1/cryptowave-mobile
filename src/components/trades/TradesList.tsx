import React from 'react'
import { ScrollView, StyleSheet, View, ViewStyle } from 'react-native'
import AssetPairTrades from '../../models/assets/AssetPairTrades'
import ElevatedView from '../common/wrappers/ElevatedView'
import {
   flex,
   paddingL, paddingS,
} from '../../style/globalStyle'
import SingleTradeListItem from './SingleTradeListItem'

interface Props {
   assetPairTrades: AssetPairTrades
   style?: ViewStyle
}

const TradesList: React.FC<Props> = (props: Props) => {
   return <ElevatedView outerViewStyle={[{...flex, ...paddingL}, props.style || {}]}>
      <ScrollView>
         <View>
            {
               [...props.assetPairTrades.getTrades()]
                  .reverse()
                  .map((trade, index) => <SingleTradeListItem key={index} trade={trade}/>)
            }
         </View>
      </ScrollView>
   </ElevatedView>
}
export default TradesList

const styles = StyleSheet.create({
   tradeWrapper: {
      ...paddingS,
      backgroundColor: 'red'
   }
})
