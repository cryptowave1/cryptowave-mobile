import { combineReducers, Slice, Reducer } from '@reduxjs/toolkit'
import reduceReducers from 'reduce-reducers'
import getKeyValue from './getKeyValue'

const combineSlices = <T, U>(sliceReducer: Reducer, sliceInitialState: T, childSlices: { [key: string]: Slice<U> }):
   Reducer<T & { [key: string]: U }> => {
   const noopReducersFromInitialState = Object.keys(sliceInitialState).reduce(
      (prev, curr) => {
         return {
            ...prev,
            [curr]: (s = null) => s,
         }
      },
      {},
   )

   const childSliceReducers = {} as { [key: string]: Reducer }
   for (let childSliceKey in childSlices) {
      childSliceReducers[childSliceKey] =
         getKeyValue<keyof { [key: string]: Slice<U> }, { [key: string]: Slice<U> }>(childSliceKey)(childSlices).reducer
   }

   const childReducers = combineReducers({
      ...childSliceReducers,
      ...noopReducersFromInitialState,
   })

   return reduceReducers(sliceReducer, childReducers) as Reducer<T & { [key: string]: U }>
}

export default combineSlices
