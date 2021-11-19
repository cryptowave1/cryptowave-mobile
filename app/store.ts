import createFlipperDebugger from 'redux-flipper'
import { enableMapSet } from 'immer'
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import rootReducers from './rootReducers'

// Enables the use of Map/Set objects inside the store's state
// todo akolov: find out why it is not working correctly
enableMapSet()

export const store = configureStore({
   reducer: rootReducers,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({serializableCheck: false}).concat(createFlipperDebugger())
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>
