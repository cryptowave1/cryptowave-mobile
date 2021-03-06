import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import Asset from '../../models/assets/Asset'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { AssetPair } from '../../models/assets/AssetPair'
import AssetSelector from './AssetSelector'
import { fetchAssetsThunk } from './assetsSlice'
import { flex } from '../../style/globalStyle'
import CenteredSpinner from '../../components/common/CenteredSpinner'
import strings from '../../strings'

const INITIAL_BASE_SELECTED_ASSET_SYMBOL = 'BTC'
const INITIAL_QUOTE_SELECTED_ASSET_SYMBOL = 'USDT'
const INITIAL_ASSETS_FETCH_COUNT = 200

interface Props {
   onSelectedAssetPair: (assetPair: AssetPair) => void
   style?: ViewStyle
}

const AssetPairSelector: React.FC<Props> = (props: Props) => {
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

   return <View style={[styles.assetsListsWrapper, props.style]}>
      {
         !baseSelectedAsset || !quoteSelectedAsset
            ? <CenteredSpinner/>
            : <>
               <View style={styles.singleAssetListWrapper}>
                  <AssetSelector
                     initialSymbol={INITIAL_BASE_SELECTED_ASSET_SYMBOL}
                     selectedAsset={baseSelectedAsset}
                     onSelectedAssetChange={onBaseChange}
                     inputPlaceholder={strings.common_base.toUpperCase()}
                  />
               </View>
               <View style={styles.singleAssetListWrapper}>
                  <AssetSelector
                     initialSymbol={INITIAL_QUOTE_SELECTED_ASSET_SYMBOL}
                     selectedAsset={quoteSelectedAsset}
                     onSelectedAssetChange={onQuoteChange}
                     inputPlaceholder={strings.common_quote.toUpperCase()}
                  />
               </View>
            </>
      }
   </View>
}
export default AssetPairSelector

const styles = StyleSheet.create({
   assetsListsWrapper: {
      ...flex,
      flexDirection: 'row',
   },
   singleAssetListWrapper: {
      ...flex,
      width: '49%',
   },
   logo: {
      alignItems: 'center',
   },
})
