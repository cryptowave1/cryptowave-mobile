import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Asset from '../../models/Asset'
import { AppDispatch, AppThunk, RootState, store } from '../../app/store'
import fetchAssets from '../../api/coinGecko/fetchAssets'
import { fetchAssetsListItemsThunk } from './assetsListItemsSlice'
import { AssetsListItem, filterAssetsListItems } from '../../models/AssetsListItem'
import async, { ErrorCallback, QueueObject } from 'async'

export interface AssetsState {
   loading: boolean
   assets: Asset[]
   error?: Error
}

const initialState: AssetsState = {
   loading: false,
   assets: [],
   error: undefined,
} as AssetsState

export const assetsSlice = createSlice({
   name: 'assets',
   initialState,
   reducers: {
      // todo akolov: add loading
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
      fetchAdditionalAssetsSuccess(state, action: PayloadAction<Asset[]>) {
         state.loading = false
         state.assets.push(...action.payload)
         state.error = undefined
      },
      fetchAdditionalAssetsFailed(state, action: PayloadAction<Error>) {
         state.loading = false
         state.error = action.payload
      },
   },
})

export const {
   fetchAssetsSuccess,
   fetchAssetsFailed,
   fetchAdditionalAssetsSuccess,
   fetchAdditionalAssetsFailed,
} = assetsSlice.actions

const fetchAdditionalAssetsQueue: QueueObject<AppThunk> = async.queue<AppThunk>(
   (task: AppThunk, callback: ErrorCallback) => {
      store.dispatch(task)
      callback()
   }, 1)

export const addToFetchAdditionalAssetsQueue = (thunk: AppThunk) => {
   fetchAdditionalAssetsQueue.push(thunk)
   console.log(fetchAdditionalAssetsQueue.length())
}

export const fetchAdditionalAssets = (label: string, resultsPerPage: number, pageNumber: number): AppThunk =>
   async (dispatch: AppDispatch, getState: () => RootState) => {
      console.log('args')
      console.log(label, resultsPerPage, pageNumber)

      if (!label.length) {
         return
      }

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
         dispatch(fetchAdditionalAssetsSuccess(newAssets))
      } catch (err) {
         console.log(err)
         dispatch(fetchAdditionalAssetsFailed(err as Error))
      }
   }

export const fetchAssetsThunk = (resultsPerPage: number, pageNumber: number): AppThunk =>
   async (dispatch: AppDispatch) => {
      try {
         const assets = await fetchAssets(resultsPerPage, pageNumber)
         dispatch(fetchAssetsSuccess(assets))
      } catch (err) {
         dispatch(fetchAssetsFailed(err as Error))
      }
   }

export default assetsSlice.reducer
