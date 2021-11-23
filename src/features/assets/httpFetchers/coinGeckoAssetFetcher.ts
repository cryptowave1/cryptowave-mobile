import HttpRequestStrategy from '../../../models/http/HttpFetchStrategy'
import Asset from '../../../models/assets/Asset'
import { MarketData } from '../../../models/market/MarketData'
import { COIN_GECKO_API_URL } from './httpFetchersConstants'

export interface CoinGeckoAssetFetcherResponseItem {
   symbol: string
   name: string
   id: string
   image: string
   current_price: number
   market_cap: number
   price_change_24h: number
}

export interface CoinGeckoAssetFetcherExecuteArgs {
   resultsPerPage: number
   pageNumber: number
   ids?: string[]
}

const MARKETS_ENDPOINT = '/api/v3/coins/markets'
const COMPARATOR = 'market_cap_desc'
const VS_CURRENCY = 'usd'

const coinGeckoAssetFetcher = new HttpRequestStrategy<Asset[], CoinGeckoAssetFetcherExecuteArgs, CoinGeckoAssetFetcherResponseItem[]>(
   (params: CoinGeckoAssetFetcherExecuteArgs) => {
      return {
         method: 'GET' as const,
         endpoint: `${COIN_GECKO_API_URL}${MARKETS_ENDPOINT}`,
         query: {
            order: COMPARATOR,
            vs_currency: VS_CURRENCY,
            per_page: params.resultsPerPage,
            page: params.pageNumber,
            ...(params.ids?.length && {ids: params.ids.join(',')}),
         }
      }
   },
   (response: CoinGeckoAssetFetcherResponseItem[]) => {
      return response
         .sort((first, second) => second.market_cap - first.market_cap)
         .map((obj: CoinGeckoAssetFetcherResponseItem) => new Asset(
            obj.name,
            obj.symbol,
            obj.id,
            obj.image,
            new MarketData(Number(obj.current_price), Number(obj.market_cap), Number(obj.price_change_24h)))
         )
   },
)

export default coinGeckoAssetFetcher

