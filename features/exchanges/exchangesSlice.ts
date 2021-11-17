import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../../app/store';
import AssetPairPricing from '../../models/AssetPairPricing';
import Exchange from '../../models/Exchange';
import { AssetPair } from '../../models/AssetPair';
import { FetchPairPriceStrategy, FetchPairPriceStrategyContext } from '../../api/FetchPairPriceStrategy';
import text from '../../text';
import ConcreteFetchPairPriceStrategyBinance from '../../api/ConcreteFetchPairPriceStrategyBinance';

type AssetPairToPricings = {
   [key: string]: AssetPairPricing[]; // todo akolov: find a way to use real Map object if possible
};

export interface ExchangesState {
   exchangeToAssetsPricings: {
      [key: string]: AssetPairToPricings;
   };
}

const initialState: ExchangesState = {
   exchangeToAssetsPricings: {},
} as ExchangesState;

export const exchangesSlice = createSlice({
   name: 'exchanges',
   initialState,
   reducers: {
      // todo akolov: error handling
      fetchCurrentPricesSuccess(state, action: PayloadAction<ExchangeWithCurrentPrice[]>) {
         action.payload.forEach((exchangeWithCurrentPrice: ExchangeWithCurrentPrice) => {
            const currentExchange: string = exchangeWithCurrentPrice.exchange.toString();
            const currentPriceLabel: string = exchangeWithCurrentPrice.currentPrice.toString();

            if (!state.exchangeToAssetsPricings[currentExchange]) {
               state.exchangeToAssetsPricings[currentExchange] = {};
            }

            if (!state.exchangeToAssetsPricings[currentExchange][currentPriceLabel]) {
               state.exchangeToAssetsPricings[currentExchange][currentPriceLabel] = [];
            }

            state.exchangeToAssetsPricings[currentExchange][currentPriceLabel]
               .push(exchangeWithCurrentPrice.currentPrice);
         })
      },
   },
});

export const {
   fetchCurrentPricesSuccess,
} = exchangesSlice.actions;

interface ExchangeWithExchangeStrategy {
   exchange: Exchange;
   strategy: FetchPairPriceStrategy;
}

const EXCHANGE_TO_EXCHANGE_STRATEGY: ExchangeWithExchangeStrategy [] = [
   {
      exchange: new Exchange('binance', text.exchange_name_binance),
      strategy: new ConcreteFetchPairPriceStrategyBinance()
   }
]

interface ExchangeWithCurrentPrice {
   exchange: Exchange;
   currentPrice: AssetPairPricing;
}

export const fetchCurrentPricesThunk = (assetPair: AssetPair): AppThunk => async dispatch => {
   const context = new FetchPairPriceStrategyContext();

   const currentPrices: ExchangeWithCurrentPrice[] = [];
   for (let exchangeToStrategy of EXCHANGE_TO_EXCHANGE_STRATEGY) {
      context.setStrategy(exchangeToStrategy.strategy);
      let result: AssetPairPricing[];
      try {
         result = await context.getPrices([assetPair]);
      } catch (err) {
         continue; // todo akolov: error handling
      }
      const currentPrice: AssetPairPricing = result[0];

      currentPrices.push({
         exchange: exchangeToStrategy.exchange,
         currentPrice: currentPrice,
      })
   }

   dispatch(fetchCurrentPricesSuccess(currentPrices));
}

export default exchangesSlice.reducer;
