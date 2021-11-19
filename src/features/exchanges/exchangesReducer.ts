import { createSlice } from '@reduxjs/toolkit'
import combineSlices from '../../utils/functions/combineSlices'
import krakenSlice, { krakenSliceInitialState } from './exchangeSlices/krakenSlice'
import { AssetPair } from '../../models/assets/AssetPair'
import { AppDispatch, AppThunk, RootState } from '../../app/store'
import { ExchangeState } from './createExchangeSlice'
import { FetchPairTradesStrategyContext } from '../../models/exchanges/fetch/FetchPairPriceStrategy'
import Trade from '../../models/market/Trade'
import binanceSlice, { binanceSliceInitialState } from './exchangeSlices/binanceSlice'

export interface ExchangesState {
}

const exchangesInitialState: ExchangesState = {} as ExchangesState

export const exchangesSlice = createSlice({
   name: 'exchangesSlice',
   initialState: exchangesInitialState,
   reducers: {},
})

export const exchangeSlices = [
   {slice: krakenSlice, initialState: krakenSliceInitialState},
   {slice: binanceSlice, initialState: binanceSliceInitialState},
]

const slicesObject = Object.fromEntries(
   exchangeSlices.map(sliceObj => [sliceObj.initialState.exchange.getId(), sliceObj.slice]))

const combined = combineSlices<ExchangesState, ExchangeState>(exchangesSlice.reducer, exchangesInitialState, slicesObject)

type SlicesKey = keyof typeof slicesObject

export const fetchRecentTradesThunk = (assetPair: AssetPair, limit: number = 1): AppThunk =>
   async (dispatch: AppDispatch, getState: () => RootState) => {
      const context: FetchPairTradesStrategyContext = new FetchPairTradesStrategyContext()
      const promises: Promise<Trade[]>[] = []
      Object.keys(slicesObject).forEach(key => {
         const state: ExchangeState = getState().exchanges[key]

         if (!state.tickerToAssetPairTrades[assetPair.toTicker()]) {
            dispatch(slicesObject[key as SlicesKey].actions.initTradingPair(assetPair))
         }

         context.setStrategy(state.fetchPairTradesStrategy)
         const recentTradesPromise: Promise<Trade[]> = context.fetchRecentTrades(assetPair)
         promises.push(recentTradesPromise)
      })

      const exchangesTrades = await Promise.allSettled(promises)

      Object.keys(slicesObject).forEach((key, index) => {
         if (exchangesTrades[index].status === 'fulfilled') {
            dispatch(slicesObject[key as SlicesKey].actions.fetchRecentTradesSuccess({
               ticker: assetPair.toTicker(),
               // @ts-ignore allSettled returns PromiseSettledResult, which is not exported at all
               trades: exchangesTrades[index].value,
            }))
         } else {
            dispatch(slicesObject[key as SlicesKey].actions.fetchRecentTradesFailed({
               ticker: assetPair.toTicker(),
               // @ts-ignore allSettled returns PromiseSettledResult, which is not exported at all
               error: exchangesTrades[index].reason
            }))
         }
      })
   }

export default combined
