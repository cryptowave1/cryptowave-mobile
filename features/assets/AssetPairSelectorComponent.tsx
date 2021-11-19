import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native';
import Asset from '../../models/Asset'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { AssetPair } from '../../models/AssetPair'
import AssetSelectorComponent from './AssetSelectorComponet';
import { fetchAssetsThunk } from './assetsSlice';

const INITIAL_BASE_SELECTED_ASSET_SYMBOL = 'BTC'
const INITIAL_QUOTE_SELECTED_ASSET_SYMBOL = 'USDT'
const INITIAL_ASSETS_FETCH_COUNT = 20

const findAsset = (assets: Asset[], symbol: string): Asset | undefined => {
   return assets.find(asset => asset.getSymbol().toLowerCase() === symbol.toLowerCase())
}

interface Props {
   onSelectedAssetPair: (assetPair: AssetPair) => void
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
      setBaseSelectedAsset(findAsset(assets, INITIAL_BASE_SELECTED_ASSET_SYMBOL))
      setQuoteSelectedAsset(findAsset(assets, INITIAL_QUOTE_SELECTED_ASSET_SYMBOL))
   }, [assets])

   useEffect(() => {
      if (!baseSelectedAsset || !quoteSelectedAsset) {
         return
      }
      const assetPair: AssetPair = new AssetPair(baseSelectedAsset!, quoteSelectedAsset!);
      props.onSelectedAssetPair(assetPair);
   }, [baseSelectedAsset, quoteSelectedAsset])

   return <View style={style.assetsListsWrapper}>
      <View style={style.singleAssetListWrapper}>
         <AssetSelectorComponent
            initalSymbol={INITIAL_BASE_SELECTED_ASSET_SYMBOL}
            initialSelectedAsset={baseSelectedAsset}
            onSelectedAssetChange={(asset: Asset) => {
               setBaseSelectedAsset(asset)
            }}
         />
      </View>
      <View style={style.singleAssetListWrapper}>
         <AssetSelectorComponent
            initalSymbol={INITIAL_QUOTE_SELECTED_ASSET_SYMBOL}
            initialSelectedAsset={quoteSelectedAsset}
            onSelectedAssetChange={(asset: Asset) => {
               setQuoteSelectedAsset(asset)
            }}
         />
      </View>
   </View>
}
export default AssetPairSelectorComponent

const style = StyleSheet.create({
   assetsListsWrapper: {
      flexDirection: 'row'
   },
   singleAssetListWrapper: {
      flex: 1,
      width: '49%'
   },
   logo: {
      alignItems: 'center'
   }
})
