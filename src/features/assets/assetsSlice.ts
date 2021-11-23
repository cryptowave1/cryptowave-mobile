import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Asset from '../../models/assets/Asset'
import { AppDispatch, AppThunk } from '../../app/store'
import AssetsFetcher from '../../models/http/fetch/AssetsFetcher'
import coinGeckoAssetsListFetcher from '../../models/http/fetch/coinGeckoAssetsListFetcher'
import coinGeckoAssetFetcher from '../../models/http/fetch/coinGeckoAssetFetcher'

export interface AssetsState {
   loading: boolean
   loadingAdditionalAssets: boolean
   assets: Asset[]
   error?: Error
   fetchAdditionalAssetsError?: Error
}

const initialState: AssetsState = {
   loading: false,
   loadingAdditionalAssets: false,
   assets: [],
   error: undefined,
   fetchAdditionalAssetsError: undefined,
} as AssetsState

export const assetsSlice = createSlice({
   name: 'assets',
   initialState,
   reducers: {
      fetchAssetsStart(state) {
         state.loading = true
         state.error = undefined
      },
      fetchAssetsSuccess(state, action: PayloadAction<Asset[]>) {
         state.loading = false
         state.assets = action.payload
         state.error = undefined
      },
      fetchAssetsFailed(state, action: PayloadAction<Error>) {
         state.loading = false
         state.assets = []
         state.error = action.payload
      },
      fetchAdditionalAssetsStart(state) {
         state.loadingAdditionalAssets = true
         state.fetchAdditionalAssetsError = undefined
      },
      fetchAdditionalAssetsSuccess(state, action: PayloadAction<Asset[]>) {
         state.loadingAdditionalAssets = false
         state.assets = action.payload
         state.fetchAdditionalAssetsError = undefined
      },
      fetchAdditionalAssetsFailed(state, action: PayloadAction<Error>) {
         state.loadingAdditionalAssets = false
         state.fetchAdditionalAssetsError = action.payload
      },
   },
})

const assetStore = new AssetsFetcher(coinGeckoAssetsListFetcher, coinGeckoAssetFetcher)

export const fetchAdditionalAssets = (label: string, resultsPerPage: number, pageNumber: number): AppThunk =>
   async (dispatch: AppDispatch) => {
      if (!label.length) {
         return
      }
      dispatch(assetsSlice.actions.fetchAdditionalAssetsStart())
      try {
         const assets = (await assetStore.searchAssets(label, resultsPerPage, pageNumber)).getAvailableAssets()
         dispatch(assetsSlice.actions.fetchAdditionalAssetsSuccess(assets))
      } catch (err) {
         dispatch(assetsSlice.actions.fetchAdditionalAssetsFailed(err as Error))
      }
   }

export const fetchAssetsThunk = (resultsPerPage: number, pageNumber: number): AppThunk =>
   async (dispatch: AppDispatch) => {
      dispatch(assetsSlice.actions.fetchAssetsStart())
      try {
         const assets = (await assetStore.fetchAssets(resultsPerPage, pageNumber)).getAvailableAssets()
         dispatch(assetsSlice.actions.fetchAssetsSuccess(assets))
      } catch (err) {
         dispatch(assetsSlice.actions.fetchAssetsFailed(err as Error))
      }
   }

export default assetsSlice.reducer
