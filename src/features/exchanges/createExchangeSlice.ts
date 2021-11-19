import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import AssetPairTrades from '../../models/assets/AssetPairTrades'
import Exchange from '../../models/exchanges/Exchange'
import { AssetPair } from '../../models/assets/AssetPair'
import Trade from '../../models/market/Trade'
import { FetchPairTradesStrategy } from '../../models/exchanges/fetch/FetchPairPriceStrategy'
import { PairNotSupportedError } from '../../errors/errors'

export interface ExchangeState {
   exchange: Exchange,
   fetchPairTradesStrategy: FetchPairTradesStrategy
   tickerToAssetPairTrades: {
      [key: string]: AssetPairTrades
   }
}

export interface TickerWithTrades {
   ticker: string
   trades: Trade[]
}

export interface TickerWithError {
   ticker: string
   error: Error
}

const createExchangeSlice = ({name = '', initialState}: {
   name: string, initialState: ExchangeState
}) => createSlice({
   name,
   initialState,
   reducers: {
      initTradingPair(state, action: PayloadAction<AssetPair>) {
         const currentTicker: string = action.payload.toTicker()
         state.tickerToAssetPairTrades[currentTicker] =
            new AssetPairTrades(action.payload, [])
      },
      fetchRecentTradesFailed(state, action: PayloadAction<TickerWithError>) {
         if (action.payload.error instanceof PairNotSupportedError) {
            const currentTicker: string = action.payload.ticker
            state.tickerToAssetPairTrades[currentTicker].setSupported(false)
         }
      },
      fetchRecentTradesSuccess(state, action: PayloadAction<TickerWithTrades>) {
         const currentTicker: string = action.payload.ticker
         state.tickerToAssetPairTrades[currentTicker].setSupported(true)
         state.tickerToAssetPairTrades[currentTicker].addTrades(action.payload.trades)
      },
   },
})

export default createExchangeSlice
