import { FetchPairPriceStrategy } from './FetchPairPriceStrategy';
import PairPricing from '../models/PairPricing';
import SymbolPair from '../models/SymbolPair';
import { getQueryString } from '../utils/getQueryString';

interface BinancePricingResponse {
   lastUpdateId: number;
   bids: Array<Array<number>>;
   asks: Array<Array<number>>;
   code?: number;
}

export default class ConcreteFetchPairPriceStrategyBinance implements FetchPairPriceStrategy {
   private static readonly API_ADDRESS = 'https://api.binance.com';
   private static readonly ORDER_BOOK_ENDPOINT = '/api/v3/depth';
   private static readonly PAIR_NOT_SUPPORTED_ERROR_NUMBER = -1121;

   private static async fetchSinglePrice(symbolPair: SymbolPair): Promise<PairPricing> {
      const ticker: string = `${symbolPair.getBaseSymbol().toUpperCase()}${symbolPair.getQuoteSymbol().toUpperCase()}`;
      const endpoint = `${ConcreteFetchPairPriceStrategyBinance.API_ADDRESS}${ConcreteFetchPairPriceStrategyBinance.ORDER_BOOK_ENDPOINT}?${getQueryString({symbol: ticker})}`;

      let supported: boolean = true;
      let response: Response;
      try {
         response = await fetch(endpoint, {
            method: 'GET',
         });
      } catch (err) {
         supported = false;
      }
      // @ts-ignore
      const result: BinancePricingResponse = await response.json();

      if (result.code === ConcreteFetchPairPriceStrategyBinance.PAIR_NOT_SUPPORTED_ERROR_NUMBER) {
         supported = false;
      }

      return new PairPricing(
         symbolPair.getBaseSymbol(),
         symbolPair.getQuoteSymbol(),
         supported,
         supported ? result.bids[0][0] : undefined,
         supported ? result.asks[0][0] : undefined,
      );
   }

   async getPrices(symbolPairs: SymbolPair[]): Promise<PairPricing[]> {
      return Promise.all(symbolPairs.map(pair => ConcreteFetchPairPriceStrategyBinance.fetchSinglePrice(pair)));
   };

   async getPreviousPrices(symbolPair: SymbolPair, intervalMs: number, from: Date): Promise<PairPricing[]> {
      // todo
      return Promise.resolve([]);
   }
}
