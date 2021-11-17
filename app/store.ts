import createFlipperDebugger from 'redux-flipper';
import { enableMapSet } from 'immer';
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
/**
 * Reducer imports
 */
import assetsReducer from '../features/assets/assetsSlice';
import exchangesReducer from '../features/exchanges/exchangesSlice';

// Enables the use of Map/Set objects inside the store's state
enableMapSet();

export const store = configureStore({
   reducer: {
      assets: assetsReducer,
      exchanges: exchangesReducer,
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({serializableCheck: false}).concat(createFlipperDebugger())
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
