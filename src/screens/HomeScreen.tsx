import React, { useState } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import Logo from '../components/common/Logo'
import { globalStyle } from '../style/style'
import AssetPairSelectorComponent from '../features/assets/AssetPairSelectorComponent'
import { AssetPair } from '../models/assets/AssetPair'
import { useDispatch } from 'react-redux'
import ExchangesRecentTradesList from '../features/exchanges/ExchangeRecentTradesList'

interface Props {
}

const HomeScreen: React.FC<Props> = (props: Props) => {
   const dispatch = useDispatch()

   const [assetPair, setAssetPair] = useState<AssetPair | undefined>(undefined)

   return (
      <SafeAreaView style={[globalStyle.mainBackgroundColor, style.wrapper]}>
         <Logo style={style.logo}/>
         <AssetPairSelectorComponent
            onSelectedAssetPair={(assetPair: AssetPair) => {
               setAssetPair(assetPair)
            }}
         />
         {assetPair && <ExchangesRecentTradesList assetPair={assetPair}/>}
      </SafeAreaView>
   )
}
export default HomeScreen

const style = StyleSheet.create({
   wrapper: {
      flex: 1
   },
   logo: {
      alignItems: 'center'
   }
})
