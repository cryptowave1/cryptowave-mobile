import React from 'react'
import { ScrollView, StyleSheet, Text, View, ViewStyle } from 'react-native'
import AssetPairTrades from '../../models/assets/AssetPairTrades'
import ElevatedView from '../common/wrappers/ElevatedView'
import {
   flex,
   paddingL, paddingS,
} from '../../style/globalStyle'
import SingleTradeListItem from './SingleTradeListItem';

interface Props {
   assetPairTrades: AssetPairTrades
   style?: ViewStyle
}

const RecentTradesList: React.FC<Props> = (props: Props) => {
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
export default RecentTradesList

const styles = StyleSheet.create({
   tradeWrapper: {
      ...paddingS,
      backgroundColor: 'red'
   }
})
