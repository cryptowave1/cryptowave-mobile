import React, { useCallback, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import AssetPairSelectorComponent from '../assets/AssetPairSelectorComponent'
import { AssetPair } from '../../models/assets/AssetPair'
import ExchangesRecentTradesList from '../exchanges/trades/ExchangesRecentTradesList'
import TopBarHome from '../layout/TopBarHome'
import commonConstants from '../../style/globalConstants'
import { bgO1, flex } from '../../style/globalStyle'

interface Props {
}

const HomeScreen: React.FC<Props> = (props: Props) => {
   const [assetPair, setAssetPair] = useState<AssetPair | undefined>(undefined)

   const onAssetPairChange = useCallback((assetPair: AssetPair) => setAssetPair(assetPair), [assetPair])

   return (
      <View style={[styles.wrapper]}>
         <TopBarHome/>
         <AssetPairSelectorComponent
            style={styles.assetPairSelector}
            onSelectedAssetPair={onAssetPairChange}
         />
         {assetPair && <ExchangesRecentTradesList style={styles.tradesList} assetPair={assetPair}/>}
      </View>
   )
}
export default HomeScreen

const styles = StyleSheet.create({
   wrapper: {
      ...bgO1,
      ...flex,
   },
   logo: {
      alignItems: 'center'
   },
   assetPairSelector: {
      marginTop: commonConstants.layout.distance.m,
   },
   tradesList: {
      marginTop: commonConstants.layout.distance.xl,
   },
})
