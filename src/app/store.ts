import createFlipperDebugger from 'redux-flipper'
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import rootReducers from './rootReducers'

export const store = configureStore({
   reducer: rootReducers,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({serializableCheck: false}).concat(createFlipperDebugger())
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>
