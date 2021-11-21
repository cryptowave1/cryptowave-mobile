import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import Asset from '../../models/assets/Asset'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { AssetPair } from '../../models/assets/AssetPair'
import AssetSelectorComponent from './AssetSelectorComponet'
import { fetchAssetsThunk } from './assetsSlice'

const INITIAL_BASE_SELECTED_ASSET_SYMBOL = 'BTC'
const INITIAL_QUOTE_SELECTED_ASSET_SYMBOL = 'USDT'
const INITIAL_ASSETS_FETCH_COUNT = 20

interface Props {
   onSelectedAssetPair: (assetPair: AssetPair) => void
   style?: ViewStyle
}

const AssetPairSelectorComponent: React.FC<Props> = (props: Props) => {
   const dispatch = useDispatch()

   const assets: Asset[] = useSelector((state: RootState) => state.assets.assets)
   const [baseSelectedAsset, setBaseSelectedAsset] = useState<Asset | undefined>(undefined)
   const [quoteSelectedAsset, setQuoteSelectedAsset] = useState<Asset | undefined>(undefined)

   useEffect(() => {
      dispatch(fetchAssetsThunk(INITIAL_ASSETS_FETCH_COUNT, 1))
   }, [])

   useEffect(() => {
      if (baseSelectedAsset && quoteSelectedAsset) {
         return
      }
      setBaseSelectedAsset(Asset.findAsset(assets, INITIAL_BASE_SELECTED_ASSET_SYMBOL))
      setQuoteSelectedAsset(Asset.findAsset(assets, INITIAL_QUOTE_SELECTED_ASSET_SYMBOL))
   }, [assets, baseSelectedAsset, quoteSelectedAsset])

   useEffect(() => {
      if (!baseSelectedAsset || !quoteSelectedAsset) {
         return
      }
      const assetPair: AssetPair = new AssetPair(baseSelectedAsset, quoteSelectedAsset)
      props.onSelectedAssetPair(assetPair)
   }, [baseSelectedAsset, quoteSelectedAsset])

   const onBaseChange = useCallback((base) => setBaseSelectedAsset(base), [baseSelectedAsset])
   const onQuoteChange = useCallback((quote) => setQuoteSelectedAsset(quote), [quoteSelectedAsset])

   return <View style={[style.assetsListsWrapper, props.style]}>
      <View style={style.singleAssetListWrapper}>
         <AssetSelectorComponent
            initalSymbol={INITIAL_BASE_SELECTED_ASSET_SYMBOL}
            selectedAsset={baseSelectedAsset}
            onSelectedAssetChange={onBaseChange}
         />
      </View>
      <View style={style.singleAssetListWrapper}>
         <AssetSelectorComponent
            initalSymbol={INITIAL_QUOTE_SELECTED_ASSET_SYMBOL}
            selectedAsset={quoteSelectedAsset}
            onSelectedAssetChange={onQuoteChange}
         />
      </View>
   </View>
}
export default AssetPairSelectorComponent

const style = StyleSheet.create({
   assetsListsWrapper: {
      flex: 1,
      flexDirection: 'row',
   },
   singleAssetListWrapper: {
      flex: 1,
      width: '49%',
   },
   logo: {
      alignItems: 'center',
   },
})
