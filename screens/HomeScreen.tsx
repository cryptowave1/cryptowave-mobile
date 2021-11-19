import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import Logo from '../components/common/Logo'
import { globalStyle } from '../style/style'
import AssetPairSelectorComponent from '../features/assets/AssetPairSelectorComponent'
import { AssetPair } from '../models/AssetPair';
import { fetchRecentTradesThunk } from '../features/exchanges/exchangesReducer';
import { useDispatch } from 'react-redux';

interface Props {
}

const HomeScreen: React.FC<Props> = (props: Props) => {
   const dispatch = useDispatch()

   const [assetPair, setAssetPair] = useState<AssetPair | undefined>(undefined)

   useEffect(() => {
      if (!assetPair) {
         return;
      }
      const interval = setInterval(() => {
         dispatch(fetchRecentTradesThunk(assetPair))
      }, 10000)
      return () => clearInterval(interval)
   }, [assetPair])

   return (
      <SafeAreaView style={[globalStyle.mainBackgroundColor, style.wrapper]}>
         <Logo style={style.logo}/>
         <AssetPairSelectorComponent
            onSelectedAssetPair={(assetPair: AssetPair) => {
               setAssetPair(assetPair)
            }}
         />
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
