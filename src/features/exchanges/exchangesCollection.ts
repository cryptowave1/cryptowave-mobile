import strings from '../../strings'
import Exchange, { FetchRecentTradesArguments } from '../../models/exchanges/Exchange'
import HttpRequestStrategy from '../../models/http/HttpFetchStrategy'
import SymbolPair from '../../models/assets/SymbolPair'
import Trade from '../../models/market/Trade'
import { NetworkRequestError, PairNotSupportedError } from '../../errors/errors'
import { REQUESTED_TRADES_LIMIT } from '../../constants';

interface BinanceResponse {
   price: number
   qty: number
   time: number
   isBuyerMaker: boolean
}

const binance: Exchange = new Exchange(
   'binance',
   strings.exchange_name_binance,
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
            .slice(-REQUESTED_TRADES_LIMIT)
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
   strings.exchange_name_kraken,
   new HttpRequestStrategy<Trade[], FetchRecentTradesArguments, KrakenResponse>(
      (params: FetchRecentTradesArguments) => {
         const ticker: string = `${params.symbolPair.getBaseSymbol().toUpperCase()}${params.symbolPair.getQuoteSymbol().toUpperCase()}`
         return {
            method: 'GET' as const,
            endpoint: 'https://api.kraken.com/0/public/Trades',
            query: {
               pair: ticker,
               since: Math.floor(Date.now() / 1000 - 1000),
            },
         }
      },
      (response: KrakenResponse) => {
         if (response.error.length) {
            throw response.error
         }

         return Object.values(response.result)[0]
            .slice(-REQUESTED_TRADES_LIMIT)
            .map((arr) =>
               new Trade(arr[3] as 'b' | 's', Number(arr[0]), Number(arr[1]), Number(arr[2] as number * 1000)))
      },
      (err: any) => {
         if (err[0].includes('Unknown asset pair')) {
            throw new PairNotSupportedError()
         }
         throw new NetworkRequestError()
      },
   )
)

interface HuobiResponse {
   status: 'ok' | 'error'
   data: Array<{
      data: Array<{
         direction: 'buy' | 'sell'
         amount: number
         price: number
         ts: number
      }>
   }>
}

const huobi: Exchange = new Exchange(
   'huobi',
   strings.exchange_name_huobi,
   new HttpRequestStrategy<Trade[], { symbolPair: SymbolPair, limit: number }, HuobiResponse>(
      (params: { symbolPair: SymbolPair, limit: number }) => {
         const ticker: string = `${params.symbolPair.getBaseSymbol().toLowerCase()}${params.symbolPair.getQuoteSymbol().toLowerCase()}`
         return {
            method: 'GET' as const,
            endpoint: `https://api.huobi.pro/market/history/trade`,
            query: {
               symbol: ticker,
               size: params.limit,
            },
         }
      },
      (response: HuobiResponse) => {
         if (response.status === 'error') {
            throw response
         }
         const trades: Trade[] = []
         response.data.forEach((data) => {
            data.data.forEach(obj => {
               trades.push(new Trade(obj.direction === 'buy' ? 'b' : 's', obj.price, obj.amount, obj.ts))
            })
         })
         return trades.sort((left, right) => left.getTimestamp() - right.getTimestamp())
            .slice(-REQUESTED_TRADES_LIMIT)
      },
      (err: any) => {
         if (err['err-msg'] === 'invalid symbol') {
            throw new PairNotSupportedError()
         }
         throw new NetworkRequestError()
      },
   )
)


type  BitfinexResponse = Array<Array<number>>

const bitfinex: Exchange = new Exchange(
   'bitfinex',
   strings.exchange_name_bitfinex,
   new HttpRequestStrategy<Trade[], { symbolPair: SymbolPair, limit: number }, BitfinexResponse>(
      (params: { symbolPair: SymbolPair, limit: number }) => {
         const ticker: string = `t${params.symbolPair.getBaseSymbol().toUpperCase()}${params.symbolPair.getQuoteSymbol().toUpperCase()}`
         return {
            method: 'GET' as const,
            endpoint: `https://api-pub.bitfinex.com/v2/trades/${ticker}/hist`,
            query: {
               limit: params.limit,
            },
         }
      },
      (response: BitfinexResponse) => {
         if (!response.length) {
            throw new PairNotSupportedError()
         }
         return response
            .map(arr => new Trade(arr[2] > 0 ? 'b' : 's', arr[3], Math.abs(arr[2]), arr[1]))
            .sort((left, right) => left.getTimestamp() - right.getTimestamp())
            .slice(-REQUESTED_TRADES_LIMIT)
      },
      (err: any) => {
         if (err.message === 'Unknown symbol') {
            throw new PairNotSupportedError()
         } else if (err instanceof PairNotSupportedError) {
            throw err
         }
         throw new NetworkRequestError()
      },
   )
)


export default [binance, kraken, huobi, bitfinex]
