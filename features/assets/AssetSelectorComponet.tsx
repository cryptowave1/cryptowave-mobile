import React, { useEffect, useMemo, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Asset from '../../models/Asset'
import { RootStackProps } from '../../router/routes'
import { useDispatch, useSelector } from 'react-redux'
import { addToFetchAdditionalAssetsQueue, fetchAdditionalAssets, fetchAssetsThunk } from './assetsSlice'
import useThrottledEffect from '../../utils/useThrottledEffect'
import AssetSearchInput from '../../components/assets/AssetSearchInput'
import AssetsList from '../../components/assets/AssetsList'
import { RootState } from '../../app/store';

const INITIAL_ASSETS_FETCH_COUNT = 20
const ADDITIONAL_ASSETS_FETCH_COUNT = 5

interface Props {
   onSelectedAssetChange: (asset: Asset) => void
   initialSelectedAsset?: Asset
   initalSymbol: string
}

const AssetSelectorComponent: React.FC<Props> = (props: Props) => {
   const dispatch = useDispatch()

   const assetsLoading: boolean = useSelector((state: RootState) => state.assets.loading);
   const assets: Asset[] = useSelector((state: RootState) => state.assets.assets);

   const [inputChanged, setInputChanged] = useState<boolean>(false)
   const [selectedAsset, setSelectedAsset] = useState<Asset | undefined>(props.initialSelectedAsset)
   const [text, setText] = useState<string>(props.initalSymbol)

   useEffect(() => {
      dispatch(fetchAssetsThunk(INITIAL_ASSETS_FETCH_COUNT, 1))
   }, [])

   useThrottledEffect(() => {
      if (text.length) {
         addToFetchAdditionalAssetsQueue(
            fetchAdditionalAssets(text, ADDITIONAL_ASSETS_FETCH_COUNT, 1))
      }
   }, [text], 2000)

   const filterAssets = (assets: Asset[], label: string): Asset[] => {
      if (!inputChanged) {
         return assets
      } else {
         return Asset.sortAssetsByMarketCap(Asset.filterAssets(assets, label))
      }
   }
   const displayedAssets = useMemo(() => filterAssets(assets, text), [assets, text, inputChanged])

   return <View style={style.wrapper}>
      <AssetSearchInput
         value={text}
         onValueChange={(value: string) => {
            setInputChanged(true)
            setText(value)
         }}
      />
      <AssetsList
         assets={displayedAssets}
         selectedAsset={selectedAsset}
         onAssetSelected={(asset: Asset) => {
            setSelectedAsset(asset)
         }}/>
   </View>
}

export default AssetSelectorComponent

const style = StyleSheet.create({
   wrapper: {
      flex: 1
   }
})
