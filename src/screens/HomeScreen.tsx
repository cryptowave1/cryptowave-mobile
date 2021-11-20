import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { background1 } from '../style/globalStyle'
import AssetPairSelectorComponent from '../features/assets/AssetPairSelectorComponent'
import { AssetPair } from '../models/assets/AssetPair'
import { useDispatch } from 'react-redux'
import ExchangesRecentTradesList from '../features/exchanges/trades/ExchangeRecentTradesList'
import TopBarHome from '../features/layout/TopBarHome'
import commonConstants from '../style/commonConstants';

interface Props {

}

const HomeScreen: React.FC<Props> = (props: Props) => {
   const [assetPair, setAssetPair] = useState<AssetPair | undefined>(undefined)

   return (
      <View style={[style.wrapper]}>
         <TopBarHome/>
         <AssetPairSelectorComponent
            style={style.assetPairSelector}
            onSelectedAssetPair={(assetPair: AssetPair) => {
               setAssetPair(assetPair)
            }}
         />
         {assetPair && <ExchangesRecentTradesList assetPair={assetPair}/>}
      </View>
   )
}
export default HomeScreen

const style = StyleSheet.create({
   wrapper: {
      flex: 1
   },
   logo: {
      alignItems: 'center'
   },
   assetPairSelector: {
      marginTop: commonConstants.layout.distance.medium
   }
})
