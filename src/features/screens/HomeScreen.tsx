import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AssetPairSelector from '../assets/AssetPairSelector'
import { AssetPair } from '../../models/assets/AssetPair'
import ExchangesRecentTradesList from '../exchanges/trades/ExchangesRecentTradesList'
import TopBarHome from '../layout/TopBarHome'
import commonConstants from '../../style/globalConstants'
import { bgN1, bgO1, flex } from '../../style/globalStyle'
import Logo from '../../components/common/Logo'
import ExpandableView from '../../components/common/wrappers/ExpandableView';
import { Easing, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import ElevatedView from '../../components/common/wrappers/ElevatedView';

interface Props {
}

const HomeScreen: React.FC<Props> = (props: Props) => {
   const [assetPair, setAssetPair] = useState<AssetPair | undefined>(undefined)

   const onAssetPairChange = useCallback((assetPair: AssetPair) => setAssetPair(assetPair), [assetPair])

   const initialHeight = useSharedValue(0)

   useEffect(() => {
      if (!assetPair) {
         return
      }
      initialHeight.value = withTiming(400, {
         duration: 1000,
         easing: Easing.out(Easing.exp),
      })
   })

   return <View style={[styles.wrapper]}>
      <TopBarHome>
         <Logo style={styles.logo}/>
      </TopBarHome>
      <AssetPairSelector
         style={styles.assetPairSelector}
         onSelectedAssetPair={onAssetPairChange}
      />
      {assetPair && <ExpandableView
            maxHeight={500}
            minHeight={300}
            initialHeight={initialHeight}>
         <ElevatedView outerViewStyle={{...flex}} innerViewStyle={{...bgN1}}>
            <ExchangesRecentTradesList style={styles.tradesList} assetPair={assetPair}/>
         </ElevatedView>
      </ExpandableView>}
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
      marginTop: commonConstants.layout.distance.s
   },
   logo: {
      alignItems: 'center',
   },
})
