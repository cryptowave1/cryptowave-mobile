import { createSlice } from '@reduxjs/toolkit'
import combineSlices from '../../utils/combineSlices'
import krakenSlice from './krakenSlice'
import bitfinexSlice from './bitfinexSlice'
import { AssetPair } from '../../models/AssetPair'
import { AppDispatch, AppThunk, RootState } from '../../app/store'
import { ExchangeState } from './createExchangeSlice'
import { FetchPairTradesStrategyContext } from '../../api/trades/FetchPairPriceStrategy'
import Trade from '../../models/Trade'

export interface ExchangesState {
}

const exchangesInitialState: ExchangesState = {} as ExchangesState

export const exchangesSlice = createSlice({
   name: 'exchangesSlice',
   initialState: exchangesInitialState,
   reducers: {},
})

const slices = {
   krakenSlice,
   bitfinexSlice,
}

const combined = combineSlices<ExchangesState, ExchangeState>(exchangesSlice.reducer, exchangesInitialState, slices)

type SlicesKey = keyof typeof slices

export const fetchRecentTradesThunk = (assetPair: AssetPair, limit: number = 1): AppThunk =>
   async (dispatch: AppDispatch, getState: () => RootState) => {
      const context: FetchPairTradesStrategyContext = new FetchPairTradesStrategyContext()
      const promises: Promise<Trade[]>[] = []
      Object.keys(slices).forEach(key => {
         const state: ExchangeState = getState().exchanges[key]

         if (!state.tickerToAssetPairTrades[assetPair.toTicker()]) {
            dispatch(slices[key as SlicesKey].actions.initTradingPair(assetPair))
         }

         context.setStrategy(state.fetchPairTradesStrategy)
         const recentTradesPromise: Promise<Trade[]> = context.fetchRecentTrades(assetPair)
         promises.push(recentTradesPromise)
      })

      const exchangesTrades = await Promise.allSettled(promises)

      Object.keys(slices).forEach((key, index) => {
         if (exchangesTrades[index].status !== "fulfilled") {
            dispatch(slices[key as SlicesKey].actions.fetchRecentTradesSuccess({
               ticker: assetPair.toTicker(),
               // @ts-ignore allSettled returns PromiseSettledResult, which is not exported at all
               trades: exchangesTrades[index].value,
            }))
         } else {
            dispatch(slices[key as SlicesKey].actions.fetchRecentTradesFailed({
               ticker: assetPair.toTicker(),
               // @ts-ignore allSettled returns PromiseSettledResult, which is not exported at all
               error: exchangesTrades[index].reason
            }))
         }
      })
   }

export default combined
