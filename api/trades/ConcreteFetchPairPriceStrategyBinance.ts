import { FetchPairTradesStrategy } from './FetchPairPriceStrategy'
import SymbolPair from '../../models/SymbolPair'
import { getQueryString } from '../../utils/getQueryString'
import Trade from '../../models/Trade'
import { PairNotSupportedError } from '../../errors/errors'

interface ResponseObject {
   price: number
   qty: number
   time: number
}

export default class ConcreteFetchPairPriceStrategyBinance implements FetchPairTradesStrategy {
   private static readonly API_ADDRESS = 'https://api.binance.com'
   private static readonly TRADES_ENDPOINT = '/api/v3/trades'
   private static readonly PAIR_NOT_SUPPORTED_ERROR_NUMBER = -1121

   async fetchRecentTrades(symbolPair: SymbolPair, limit: number): Promise<Trade[]> {
      const ticker: string = `${symbolPair.getBaseSymbol().toUpperCase()}${symbolPair.getQuoteSymbol().toUpperCase()}`
      const query = getQueryString({
         symbol: ticker,
         limit: limit,
      })
      const endpoint = `${ConcreteFetchPairPriceStrategyBinance.API_ADDRESS}${ConcreteFetchPairPriceStrategyBinance.TRADES_ENDPOINT}?${query}`
      try {
         const response: Response = await fetch(endpoint, {
            method: 'GET',
         })
         const result: ResponseObject[] = await response.json()
         return result.map((obj: ResponseObject) => new Trade(obj.price, obj.qty, obj.time))
      } catch (err: any) {
         if (err.code === ConcreteFetchPairPriceStrategyBinance.PAIR_NOT_SUPPORTED_ERROR_NUMBER) {
            throw new PairNotSupportedError()
         }
         throw err
      }
   }
}
