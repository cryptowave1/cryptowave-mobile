import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import AssetPairTrades from '../../models/AssetPairTrades'
import Exchange from '../../models/Exchange'
import { AssetPair } from '../../models/AssetPair'
import Trade from '../../models/Trade'
import { FetchPairTradesStrategy } from '../../api/trades/FetchPairPriceStrategy'

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
      fetchRecentTradesSuccess(state, action: PayloadAction<TickerWithTrades>) {
         (state.tickerToAssetPairTrades[action.payload.ticker] as AssetPairTrades)
            .addTrades(action.payload.trades)
      },
   },
})

export default createExchangeSlice
