import React, { useCallback, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import AssetPairSelector from '../assets/AssetPairSelector'
import { AssetPair } from '../../models/assets/AssetPair'
import RecentTradesList from '../exchanges/trades/ExchangesRecentTradesList'
import TopBarHome from '../layout/TopBarHome'
import commonConstants from '../../style/globalConstants'
import { bgO1, flex } from '../../style/globalStyle'
import Logo from '../../components/common/Logo'

interface Props {
}

const HomeScreen: React.FC<Props> = (props: Props) => {
   const [assetPair, setAssetPair] = useState<AssetPair | undefined>(undefined)

   const onAssetPairChange = useCallback((assetPair: AssetPair) => setAssetPair(assetPair), [assetPair])

   return <View style={[styles.wrapper]}>
      <TopBarHome>
         <Logo style={styles.logo}/>
      </TopBarHome>
      <AssetPairSelector
         style={styles.assetPairSelector}
         onSelectedAssetPair={onAssetPairChange}
      />
      {assetPair && <RecentTradesList style={styles.tradesList} assetPair={assetPair}/>}
   </View>
}
export default HomeScreen

const styles = StyleSheet.create({
   wrapper: {
      ...bgO1,
      ...flex,
   },
   assetPairSelector: {
      marginTop: commonConstants.layout.distance.m,
   },
   tradesList: {
      marginTop: commonConstants.layout.distance.xl,
   },
   logo: {
      alignItems: 'center',
   },
})
