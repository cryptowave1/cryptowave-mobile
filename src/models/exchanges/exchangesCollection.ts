import text from '../../strings'
import Exchange, { FetchRecentTradesArguments } from './Exchange'
import HttpRequestStrategy from '../http/fetch/HttpFetchStrategy'
import SymbolPair from '../assets/SymbolPair'
import Trade from '../market/Trade'
import { NetworkRequestError, PairNotSupportedError } from '../../errors/errors'

interface BinanceResponse {
   price: number
   qty: number
   time: number
   isBuyerMaker: boolean
}

const binance: Exchange = new Exchange(
   'binance',
   text.exchange_name_binance,
   new HttpRequestStrategy<Trade[], FetchRecentTradesArguments, BinanceResponse[]>(
      (params: { symbolPair: SymbolPair, limit?: number }) => {
         const ticker: string = `${params.symbolPair.getBaseSymbol().toUpperCase()}${params.symbolPair.getQuoteSymbol().toUpperCase()}`
         return {
            method: 'GET' as const,
            endpoint: 'https://api.binance.com/api/v3/trades',
            query: {
               symbol: ticker,
               limit: params.limit,
            },
         }
      },
      (response: BinanceResponse[]) => {
         return response
            .slice(-5)
            .map((obj: BinanceResponse) =>
            new Trade(obj.isBuyerMaker ? 'b' : 's', obj.price, obj.qty, obj.time))
      },
      (err: any) => {
         if (err.code === -1121) {
            return new PairNotSupportedError()
         }
         return new NetworkRequestError()
      },
   )
)

interface KrakenResponse {
   error: string[],
   result: {
      [ticker: string]: Array<Array<string | number>>
   }
}

const kraken: Exchange = new Exchange(
   'kraken',
   text.exchange_name_kraken,
   new HttpRequestStrategy<Trade[], FetchRecentTradesArguments, KrakenResponse>(
      (params: FetchRecentTradesArguments) => {
         const ticker: string = `${params.symbolPair.getBaseSymbol().toUpperCase()}${params.symbolPair.getQuoteSymbol().toUpperCase()}`
         return {
            method: 'GET' as const,
            endpoint: 'https://api.kraken.com/0/public/Trades',
            query: {
               pair: ticker,
               since: 0,
            },
         }
      },
      (response: KrakenResponse) => {
         if (response.error.length) {
            throw response.error
         }

         return Object.values(response.result)[0]
            .slice(-5)
            .map((arr) =>
            new Trade(arr[3] as 'b' | 's', Number(arr[0]), Number(arr[1]), Number(arr[2])))
      },
      (err: any) => {
         if (err[0].includes('Unknown asset pair')) {
            throw new PairNotSupportedError()
         }
         throw new NetworkRequestError()
      },
   )
)

// const binance3: Exchange = new Exchange(
//    'binance3',
//    text.exchange_name_binance,
//    new HttpRequestStrategy<Trade[], { symbolPair: SymbolPair, limit: number }, BinanceTradeResponse[]>(
//       (params: { symbolPair: SymbolPair, limit: number }) => {
//          const ticker: string = `${params.symbolPair.getBaseSymbol().toUpperCase()}${params.symbolPair.getQuoteSymbol().toUpperCase()}`
//          return {
//             method: 'GET' as const,
//             endpoint: 'https://api.binance.com/api/v3/trades',
//             query: {
//                symbol: ticker,
//                limit: params.limit,
//             },
//          }
//       },
//       (response: BinanceTradeResponse[]) => {
//          return response.map((obj: BinanceTradeResponse) => new Trade(obj.price, obj.qty, obj.time))
//       },
//       (err: any) => {
//          if (err.code === -1121) {
//             throw new PairNotSupportedError()
//          }
//          throw new NetworkRequestError()
//       },
//    )
// )
//

export default [binance, kraken]
