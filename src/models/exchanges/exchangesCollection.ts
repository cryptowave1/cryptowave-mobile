import text from '../../text'
import Exchange from './Exchange'
import HttpRequestStrategy from '../http/fetch/HttpFetchStrategy'
import SymbolPair from '../assets/SymbolPair'
import Trade from '../market/Trade'
import { NetworkRequestError, PairNotSupportedError } from '../../errors/errors'

interface BinanceTradeResponse {
   price: number
   qty: number
   time: number
}

const binance: Exchange = new Exchange(
   'binance',
   text.exchange_name_binance,
   new HttpRequestStrategy<Trade[], {symbolPair: SymbolPair, limit: number}, BinanceTradeResponse[]>(
      (params: {symbolPair: SymbolPair, limit: number}) => {
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
      (response: BinanceTradeResponse[]) => {
         return response.map((obj: BinanceTradeResponse) => new Trade(obj.price, obj.qty, obj.time))
      },
      (err: any) => {
         console.log(err)
         if (err.code === -1121) {
            return new PairNotSupportedError()
         }
         return new NetworkRequestError()
      },
   )
)

const binance2: Exchange = new Exchange(
   'binance2',
   text.exchange_name_binance,
   new HttpRequestStrategy<Trade[], {symbolPair: SymbolPair, limit: number}, BinanceTradeResponse[]>(
      (params: {symbolPair: SymbolPair, limit: number}) => {
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
      (response: BinanceTradeResponse[]) => {
         return response.map((obj: BinanceTradeResponse) => new Trade(obj.price, obj.qty, obj.time))
      },
      (err: any) => {
         if (err.code === -1121) {
            throw new PairNotSupportedError()
         }
         throw new NetworkRequestError()
      },
   )
)

const binance3: Exchange = new Exchange(
   'binance3',
   text.exchange_name_binance,
   new HttpRequestStrategy<Trade[], {symbolPair: SymbolPair, limit: number}, BinanceTradeResponse[]>(
      (params: {symbolPair: SymbolPair, limit: number}) => {
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
      (response: BinanceTradeResponse[]) => {
         return response.map((obj: BinanceTradeResponse) => new Trade(obj.price, obj.qty, obj.time))
      },
      (err: any) => {
         if (err.code === -1121) {
            throw new PairNotSupportedError()
         }
         throw new NetworkRequestError()
      },
   )
)



export default [binance, binance2, binance3]
