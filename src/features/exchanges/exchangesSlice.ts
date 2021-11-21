import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AssetPair } from '../../models/assets/AssetPair'
import { AppDispatch, AppThunk, RootState } from '../../app/store'
import Trade from '../../models/market/Trade'
import exchangesCollection from '../../models/exchanges/exchangesCollection';
import Exchange from '../../models/exchanges/Exchange';
import ExchangeTrades from '../../models/exchanges/ExchangeTrades';
import { PairNotSupportedError } from '../../errors/errors';
import AssetPairTrades from '../../models/assets/AssetPairTrades';

export interface ExchangesState {
   exchangeIdToExchangeTrades: { [key: string]: ExchangeTrades }
}

interface ExchangeId {
   exchangeId: string
}

export interface ExchangeIdAssetPair extends ExchangeId {
   assetPair: AssetPair
}

export interface ExchangeIdAssetPairTrades extends ExchangeId {
   assetPair: AssetPair
   trades: Trade[]
}

export interface ExchangeIdAssetPairError extends ExchangeId {
   assetPair: AssetPair
   error: Error
}

const exchangesInitialState: ExchangesState = {
   exchangeIdToExchangeTrades: exchangesCollection.reduce((accum, exchange) => {
      accum[exchange.getId()] = new ExchangeTrades(exchange)
      return accum
   }, {} as { [key: string]: ExchangeTrades })
} as ExchangesState

export const exchangesSlice = createSlice({
   name: 'exchangesSlice',
   initialState: exchangesInitialState,
   reducers: {
      initAssetPairTrades(state, action: PayloadAction<ExchangeIdAssetPair>) {
         state.exchangeIdToExchangeTrades[action.payload.exchangeId].initAssetPairTrades(action.payload.assetPair)
      },
      fetchRecentTradesSuccess(state, action: PayloadAction<ExchangeIdAssetPairTrades>) {
         state.exchangeIdToExchangeTrades[action.payload.exchangeId]
            .setPairSupported(action.payload.assetPair, true)
         state.exchangeIdToExchangeTrades[action.payload.exchangeId]
            .addPairTrades(action.payload.assetPair, action.payload.trades)
      },
      fetchRecentTradesFailed(state, action: PayloadAction<ExchangeIdAssetPairError>) {
         if (action.payload.error instanceof PairNotSupportedError) {
            state.exchangeIdToExchangeTrades[action.payload.exchangeId]
               .setPairSupported(action.payload.assetPair, false)
         }
      },
   },
})

export const fetchRecentTradesThunk = (assetPair: AssetPair, limit: number = 1): AppThunk =>
   async (dispatch: AppDispatch, getState: () => RootState) => {
      const exchanges: Exchange[] = Object.values(getState().exchanges.exchangeIdToExchangeTrades)
         .map(obj => obj.getExchange());

      exchanges.forEach(exchange => {
         let assetPairTrades: AssetPairTrades | undefined =
            getState().exchanges.exchangeIdToExchangeTrades[exchange.getId()].getAssetPairTrades(assetPair.toTicker())
         if (!assetPairTrades) {
            dispatch(exchangesSlice.actions.initAssetPairTrades(
               {exchangeId: exchange.getId(), assetPair: assetPair}));
         }
         if (assetPairTrades?.getSupported() !== false) {
            exchange.getFetchPairRecentTradesStrategy().execute({
               limit: 1,
               symbolPair: assetPair.toSymbolPair(),
            })
               .then((trades: Trade[]) => {
                  dispatch(exchangesSlice.actions.fetchRecentTradesSuccess({
                     exchangeId: exchange.getId(),
                     assetPair: assetPair,
                     trades: trades
                  }))
               })
               .catch((err) => {
                  dispatch(exchangesSlice.actions.fetchRecentTradesFailed({
                     exchangeId: exchange.getId(),
                     assetPair: assetPair,
                     error: err
                  }))
               })
         }
      })
   }

export default exchangesSlice.reducer
