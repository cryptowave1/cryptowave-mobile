import React, { useEffect, useMemo, useState } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { RootStackProps } from '../router/routes'
import Logo from '../components/Logo'
import { globalStyle } from '../style/style'
import { useDispatch, useSelector } from 'react-redux'
import {
   addToFetchAdditionalAssetsQueue,
   fetchAdditionalAssets,
   fetchAssetsThunk
} from '../features/assets/assetsSlice'
import Asset from '../models/Asset'
import { RootState } from '../app/store'
import AssetsList from '../components/assets/AssetsList'
import AssetSearchInput from '../components/assets/AssetSearchInput'
import { fetchRecentTradesThunk } from '../features/exchanges/exchangesReducer'
import { AssetPair } from '../models/AssetPair'
import useThrottledEffect from '../utils/useThrottledEffect'

const INITIAL_BASE_SELECTED_ASSET_SYMBOL = 'BTC'
const INITIAL_QUOTE_SELECTED_ASSET_SYMBOL = 'USDT'
const INITIAL_ASSETS_FETCH_COUNT = 20
const ADDITIONAL_ASSETS_FETCH_COUNT = 5

const findAsset = (assets: Asset[], symbol: string): Asset | undefined => {
   return assets.find(asset => asset.getSymbol().toLowerCase() === symbol.toLowerCase())
}

interface Props {
   navigation: RootStackProps
}

const HomeScreen: React.FC<Props> = (props: Props) => {
   const dispatch = useDispatch()

   const assets: Asset[] = useSelector((state: RootState) => state.assets.assets)

   const [baseInputChanged, setBaseInputChanged] = useState<boolean>(false)
   const [quoteInputChanged, setQuoteInputChanged] = useState<boolean>(false)
   const [baseSelectedAsset, setBaseSelectedAsset] = useState<Asset | undefined>(undefined)
   const [quoteSelectedAsset, setQuoteSelectedAsset] = useState<Asset | undefined>(undefined)
   const [baseAssetText, setBaseAssetText] = useState<string>(INITIAL_BASE_SELECTED_ASSET_SYMBOL)
   const [quoteAssetText, setQuoteAssetText] = useState<string>(INITIAL_QUOTE_SELECTED_ASSET_SYMBOL)

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
      const interval = setInterval(() => {
         dispatch(fetchRecentTradesThunk(new AssetPair(baseSelectedAsset!, quoteSelectedAsset!)))
      }, 5000)
      return () => clearInterval(interval)
   }, [baseSelectedAsset, quoteSelectedAsset])

   useThrottledEffect(() => {
      if (baseAssetText.length) {
         addToFetchAdditionalAssetsQueue(
            fetchAdditionalAssets(baseAssetText, ADDITIONAL_ASSETS_FETCH_COUNT, 1))
      }
   }, [baseAssetText], 2000)

   useThrottledEffect(() => {
      if (quoteAssetText.length) {
         addToFetchAdditionalAssetsQueue(
            fetchAdditionalAssets(quoteAssetText, ADDITIONAL_ASSETS_FETCH_COUNT, 1))
      }
   }, [quoteAssetText], 500)
   const filterBaseAssets = (assets: Asset[], label: string): Asset[] => {
      if (!baseInputChanged) {
         return assets
      } else {
         return Asset.sortAssetsByMarketCap(Asset.filterAssets(assets, label))
      }
   }
   const baseDisplayedAssets = useMemo(() => filterBaseAssets(assets, baseAssetText), [assets, baseAssetText, baseInputChanged])

   const filterQuoteAssets = (assets: Asset[], label: string): Asset[] => {
      if (!quoteInputChanged) {
         return assets
      } else {
         return Asset.sortAssetsByMarketCap(Asset.filterAssets(assets, label))
      }
   }
   const quoteDisplayedAssets = useMemo(() => filterQuoteAssets(assets, quoteAssetText), [assets, quoteAssetText, quoteInputChanged])

   return (
      <SafeAreaView style={[globalStyle.mainBackgroundColor, style.wrapper]}>
         <Logo style={style.logo}/>

         <View style={style.assetsListsWrapper}>
            <View style={style.singleAssetListWrapper}>
               <AssetSearchInput
                  value={baseAssetText}
                  onValueChange={(value: string) => {
                     setBaseInputChanged(true)
                     setBaseAssetText(value)
                  }}
               />
               <AssetsList
                  assets={baseDisplayedAssets}
                  selectedAsset={baseSelectedAsset}
                  onAssetSelected={(asset: Asset) => {
                     setBaseSelectedAsset(asset)
                  }}/>
            </View>
            <View style={style.singleAssetListWrapper}>
               <AssetSearchInput
                  value={quoteAssetText}
                  onValueChange={(value: string) => {
                     setQuoteInputChanged(true)
                     setQuoteAssetText(value)
                  }}
               />
               <AssetsList
                  assets={quoteDisplayedAssets}
                  selectedAsset={quoteSelectedAsset}
                  onAssetSelected={(asset: Asset) => setQuoteSelectedAsset(asset)}/>
            </View>
         </View>
      </SafeAreaView>
   )
}
export default HomeScreen

const style = StyleSheet.create({
   assetsListsWrapper: {
      flexDirection: 'row'
   },
   singleAssetListWrapper: {
      width: '49%'
   },
   wrapper: {
      flex: 1
   },
   logo: {
      alignItems: 'center'
   }
})
