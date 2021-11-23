import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import AssetPairSelector from '../assets/AssetPairSelector'
import { AssetPair } from '../../models/assets/AssetPair'
import ExchangesRecentTradesList from '../exchanges/trades/ExchangesRecentTradesList'
import TopBarHome from '../layout/TopBarHome'
import commonConstants from '../../style/globalConstants'
import { bgN1, bgO1, flex, roundedCornerXXL } from '../../style/globalStyle'
import Logo from '../../components/common/Logo'
import ExpandableView from '../../components/common/wrappers/ExpandableView'
import { Easing, useSharedValue, withTiming } from 'react-native-reanimated'
import ElevatedView from '../../components/common/wrappers/ElevatedView'
import {
   RECENT_TRADES_CONTAINER_HEIGHT_MAX,
   RECENT_TRADES_CONTAINER_HEIGHT_MIN
} from '../constants'

interface Props {
}

const HomeScreen: React.FC<Props> = (props: Props) => {
   const [assetPair, setAssetPair] = useState<AssetPair | undefined>(undefined)
   const [isInitialPairChanged, setInitialPairChanged] = useState<boolean>(false)

   const onAssetPairChange = useCallback((_assetPair: AssetPair) => {
      if (assetPair) {
         setInitialPairChanged(true)
      }
      setAssetPair(_assetPair)
   }, [assetPair])

   const height = useSharedValue(0)

   useEffect(() => {
      if (!assetPair) {
         return
      }
      height.value = withTiming(isInitialPairChanged
         ? RECENT_TRADES_CONTAINER_HEIGHT_MAX
         : RECENT_TRADES_CONTAINER_HEIGHT_MIN, {
         duration: 1000,
         easing: Easing.out(Easing.exp),
      })
   }, [assetPair])

   return <View style={[styles.wrapper]}>
      <TopBarHome>
         <Logo style={styles.logo}/>
      </TopBarHome>
      <AssetPairSelector
         style={styles.assetPairSelector}
         onSelectedAssetPair={onAssetPairChange}
      />
      {assetPair && <ExpandableView
            maxHeight={RECENT_TRADES_CONTAINER_HEIGHT_MAX}
            minHeight={RECENT_TRADES_CONTAINER_HEIGHT_MIN}
            sharedValue={height}>
         <ElevatedView outerViewStyle={{...flex}} innerViewStyle={styles.tradesInnerStyle}>
            <ExchangesRecentTradesList
                  style={styles.tradesList}
                  assetPair={assetPair}
                  sharedExpandableViewHeight={height}/>
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
   tradesInnerStyle: {
      ...bgN1,
      ...roundedCornerXXL
   },
   tradesList: {
      marginTop: commonConstants.layout.distance.s
   },
   logo: {
      alignItems: 'center',
   },
})
