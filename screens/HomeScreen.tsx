import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { RootStackProps } from '../router/routes';
import Logo from '../components/Logo';
import { globalStyle } from '../style/style';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAssetsThunk } from '../features/assets/assetsSlice';
import Asset from '../models/Asset';
import { RootState } from '../app/store';
import AssetsList from '../components/assets/AssetsList';
import AssetSearchInput from '../components/assets/AssetSearchInput';
import { fetchCurrentPricesThunk } from '../features/exchanges/exchangesSlice';
import { AssetPair } from '../models/AssetPair';

const INITIAL_BASE_SELECTED_ASSET_SYMBOL = 'BTC';
const INITIAL_QUOTE_SELECTED_ASSET_SYMBOL = 'USDT';
const INITIAL_ASSETS_FETCH_COUNT = 20;

const findAsset = (assets: Asset[], symbol: string): Asset | undefined => {
   return assets.find(asset => asset.getSymbol().toLowerCase() === symbol.toLowerCase());
}

const filterAssets = (assets: Asset[], text: string): Asset[] => {
   return assets.filter(asset =>
      asset.getSymbol().toLowerCase().indexOf(text.toLowerCase()) > -1 ||
      asset.getName().toLowerCase().indexOf(text.toLowerCase()) > -1
   );
}

interface Props {
   navigation: RootStackProps;
}

const HomeScreen: React.FC<Props> = (props: Props) => {
   const dispatch = useDispatch()

   const assets: Asset[] = useSelector((state: RootState) => state.assets.assets);

   const [baseInputChanged, setBaseInputChanged] = useState<boolean>(false);
   const [quoteInputChanged, setQuoteInputChanged] = useState<boolean>(false);
   const [baseSelectedAsset, setBaseSelectedAsset] = useState<Asset | undefined>(undefined);
   const [quoteSelectedAsset, setQuoteSelectedAsset] = useState<Asset | undefined>(undefined);
   const [baseAssetText, setBaseAssetText] = useState<string>(INITIAL_BASE_SELECTED_ASSET_SYMBOL);
   const [quoteAssetText, setQuoteAssetText] = useState<string>(INITIAL_QUOTE_SELECTED_ASSET_SYMBOL);


   useEffect(() => {
      dispatch(fetchAssetsThunk(INITIAL_ASSETS_FETCH_COUNT, 1));
   }, []);

   useEffect(() => {
      setBaseSelectedAsset(findAsset(assets, INITIAL_BASE_SELECTED_ASSET_SYMBOL));
      setQuoteSelectedAsset(findAsset(assets, INITIAL_QUOTE_SELECTED_ASSET_SYMBOL));
   }, [assets])

   useEffect(() => {
      if (!baseSelectedAsset || !quoteSelectedAsset) {
         return;
      }
      dispatch(fetchCurrentPricesThunk(new AssetPair(baseSelectedAsset!, quoteSelectedAsset!)));
   }, [baseSelectedAsset, quoteSelectedAsset])

   return (
      <SafeAreaView style={[globalStyle.mainBackgroundColor, style.wrapper]}>
         <Logo style={style.logo}/>

         <View style={style.assetsListsWrapper}>
            <View style={style.singleAssetListWrapper}>
               <AssetSearchInput
                  value={baseAssetText}
                  onValueChange={(value: string) => {
                     setBaseInputChanged(true);
                     setBaseAssetText(value);
                  }}
               />
               <AssetsList
                  assets={!baseInputChanged ? assets : filterAssets(assets, baseAssetText)}
                  selectedAsset={baseSelectedAsset}
                  onAssetSelected={(asset: Asset) => {
                     setBaseSelectedAsset(asset);
                  }}/>
            </View>
            <View style={style.singleAssetListWrapper}>
               <AssetSearchInput
                  value={quoteAssetText}
                  onValueChange={(value: string) => {
                     setQuoteInputChanged(true);
                     setQuoteAssetText(value);
                  }}
               />
               <AssetsList
                  assets={!quoteInputChanged ? assets : filterAssets(assets, quoteAssetText)}
                  selectedAsset={quoteSelectedAsset}
                  onAssetSelected={(asset: Asset) => setQuoteSelectedAsset(asset)}/>
            </View>
         </View>
      </SafeAreaView>
   );
}
export default HomeScreen;

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
});
