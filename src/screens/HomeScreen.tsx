import React, { useCallback, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import AssetPairSelectorComponent from '../features/assets/AssetPairSelectorComponent'
import { AssetPair } from '../models/assets/AssetPair'
import ExchangesRecentTradesList from '../features/exchanges/trades/ExchangeRecentTradesList'
import TopBarHome from '../features/layout/TopBarHome'
import commonConstants from '../style/globalConstants';

interface Props {

}

const HomeScreen: React.FC<Props> = (props: Props) => {
   const [assetPair, setAssetPair] = useState<AssetPair | undefined>(undefined)

   const onAssetPairChange = useCallback((assetPair) => setAssetPair(assetPair), [assetPair])

   return (
      <View style={[style.wrapper]}>
         <TopBarHome/>
         <AssetPairSelectorComponent
            style={style.assetPairSelector}
            onSelectedAssetPair={onAssetPairChange}
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
      marginTop: commonConstants.layout.distance.m
   }
})
