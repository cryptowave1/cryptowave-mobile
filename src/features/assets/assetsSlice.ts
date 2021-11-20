import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Asset from '../../models/assets/Asset'
import { AppDispatch, AppThunk, RootState, store } from '../../app/store'
import fetchAssets from '../../api/coinGecko/fetchAssets'
import { fetchAssetsListItemsThunk } from './assetsListItemsSlice'
import { AssetsListItem, filterAssetsListItems } from '../../models/assets/AssetsListItem'
import async, { ErrorCallback, QueueObject } from 'async'

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
         state.error = undefined
      },
      fetchAdditionalAssetsSuccess(state, action: PayloadAction<Asset[]>) {
         state.loadingAdditionalAssets = false
         state.assets.push(...action.payload)
         state.fetchAdditionalAssetsError = undefined
      },
      fetchAdditionalAssetsFailed(state, action: PayloadAction<Error>) {
         state.loadingAdditionalAssets = false
         state.fetchAdditionalAssetsError = action.payload
      },
   },
})

const fetchAdditionalAssetsQueue: QueueObject<AppThunk> = async.queue<AppThunk>(
   (task: AppThunk, callback: ErrorCallback) => {
      store.dispatch(task)
      callback()
   }, 1)

export const addToFetchAdditionalAssetsQueue = (thunk: AppThunk) => {
   fetchAdditionalAssetsQueue.push(thunk)
}

export const fetchAdditionalAssets = (label: string, resultsPerPage: number, pageNumber: number): AppThunk =>
   async (dispatch: AppDispatch, getState: () => RootState) => {
      if (!label.length) {
         return
      }

      dispatch(assetsSlice.actions.fetchAdditionalAssetsStart())

      if (!getState().assetsList.assetsListItems?.length) {
         dispatch(fetchAssetsListItemsThunk())
      }

      const filteredAssetsList: AssetsListItem[] = filterAssetsListItems(getState().assetsList.assetsListItems, label)
      if (!filteredAssetsList.length) {
         return // the item is not found in the list of assets
      }

      try {
         const currentAssets: Asset[] = getState().assets.assets
         let idsToFetch: string[] = filteredAssetsList
            // filter out currently available assets
            .filter(assetsListItem => !currentAssets.find((asset: Asset) => asset.getId() === assetsListItem.id))
            .map(assetsListItem => assetsListItem.id)
            .slice(0, 300) // Prevent too long request error code

         const fetchResultsPerPage: number = resultsPerPage >= idsToFetch.length ? idsToFetch.length : resultsPerPage
         const newAssets: Asset[] = await fetchAssets(fetchResultsPerPage, pageNumber, idsToFetch)
         dispatch(assetsSlice.actions.fetchAdditionalAssetsSuccess(newAssets))
      } catch (err) {
         dispatch(assetsSlice.actions.fetchAdditionalAssetsFailed(err as Error))
      }
   }

export const fetchAssetsThunk = (resultsPerPage: number, pageNumber: number): AppThunk =>
   async (dispatch: AppDispatch) => {
      dispatch(assetsSlice.actions.fetchAssetsStart())
      try {
         const assets = await fetchAssets(resultsPerPage, pageNumber)
         dispatch(assetsSlice.actions.fetchAssetsSuccess(assets))
      } catch (err) {
         dispatch(assetsSlice.actions.fetchAssetsFailed(err as Error))
      }
   }

export default assetsSlice.reducer
