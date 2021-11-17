import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Asset from '../../models/Asset';
import { AppThunk } from '../../app/store';
import fetchAssets from '../../api/coinGecko';

export interface AssetsState {
   loading: boolean;
   assets: Asset[];
   error?: Error;
}

const initialState: AssetsState = {
   loading: false,
   assets: [],
   error: undefined,
} as AssetsState;

export const assetsSlice = createSlice({
   name: 'assets',
   initialState,
   reducers: {
      fetchAssetsSuccess(state, action: PayloadAction<Asset[]>) {
         state.assets = action.payload;
         state.error = undefined;
      },
      getRepoDetailsFailed(state, action: PayloadAction<Error>) {
         state.assets = [];
         state.error = action.payload
      }
   },
});

export const {
   fetchAssetsSuccess,
   getRepoDetailsFailed
} = assetsSlice.actions;

export const fetchAssetsThunk = (resultsPerPage: number, pageNumber: number): AppThunk => async dispatch => {
   try {
      const assets = await fetchAssets(resultsPerPage, pageNumber);
      dispatch(fetchAssetsSuccess(assets));
   } catch (err) {
      dispatch(getRepoDetailsFailed(err as Error));
   }
}

export default assetsSlice.reducer;
