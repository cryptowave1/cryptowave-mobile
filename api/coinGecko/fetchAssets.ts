import Asset from '../../models/Asset'
import { getQueryString } from '../../utils/getQueryString'
import { MarketData } from '../../models/MarketData'

const COIN_GECKO_API_URL = 'https://api.coingecko.com'
const MARKETS_ENDPOINT = '/api/v3/coins/markets'
const COMPARATOR = 'market_cap_desc'
const VS_CURRENCY = 'usd'

interface ResponseObject {
   symbol: string
   name: string
   id: string
   image: string
   currentPrice: number
   market_cap: number
   price_change_24h: number
}

export default async function fetchAssets(resultsPerPage: number, pageNumber: number, ids?: string[]): Promise<Asset[]> {
   const query = getQueryString({
      order: COMPARATOR,
      vs_currency: VS_CURRENCY,
      per_page: resultsPerPage,
      page: pageNumber,
      ...(ids?.length && {ids: ids.join(',')}),
   })

   const endpoint = `${COIN_GECKO_API_URL}${MARKETS_ENDPOINT}?${query}`

   // todo akolov: error handling
   const response = await fetch(endpoint, {
      method: 'GET',
   })
   let result: ResponseObject[] = await response.json()

   return result
      .sort((first, second) => second.market_cap - first.market_cap)
      .map((obj: ResponseObject) => new Asset(
         obj.name,
         obj.symbol,
         obj.id,
         obj.image,
         new MarketData(obj.currentPrice, obj.market_cap, obj.price_change_24h),
      ))
}
