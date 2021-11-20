import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch, AppThunk } from '../../app/store'
import fetchAssetsList from '../../api/coinGecko/fetchAssetsList'
import { AssetsListItem } from '../../models/assets/AssetsListItem'

export interface AssetsState {
   loading: boolean
   assetsListItems: AssetsListItem[]
   error?: Error
}

const initialState: AssetsState = {
   loading: false,
   assetsListItems: [],
   error: undefined,
} as AssetsState

export const assetsSlice = createSlice({
   name: 'assetsListItems',
   initialState,
   reducers: {
      fetchAssetsListItemsSuccess(state, action: PayloadAction<AssetsListItem[]>) {
         state.loading = false
         state.assetsListItems = action.payload
         state.error = undefined
      },
      fetchAssetsListItemsFailed(state, action: PayloadAction<Error>) {
         state.loading = false
         state.assetsListItems = []
         state.error = action.payload
      }
   },
})

export const {
   fetchAssetsListItemsSuccess,
   fetchAssetsListItemsFailed
} = assetsSlice.actions

export const fetchAssetsListItemsThunk = (): AppThunk => async (dispatch: AppDispatch) => {
   try {
      const assetsListItems: AssetsListItem[] = await fetchAssetsList()
      dispatch(fetchAssetsListItemsSuccess(assetsListItems))
   } catch (err) {
      dispatch(fetchAssetsListItemsFailed(err as Error))
   }
}

export default assetsSlice.reducer
