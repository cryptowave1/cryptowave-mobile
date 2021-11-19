import { COIN_GECKO_API_URL } from './constants'
import { MarketData } from '../../models/market/MarketData'
import { getQueryString } from '../../utils/functions/getQueryString'

const SIMPLE_PRICE_ENDPOINT = '/api/v3/simple/price'
const OPTIONS = {
   include_market_cap: true,
   include_24hr_change: true,
   vs_currencies: 'usd'
}

export interface AssetIdToMarketData {
   [key: string]: MarketData
}

interface ResponseObject {
   [key: string]: {
      usd: number
      usd_market_cap: number
      usd_24h_change: number
   }
}

export default async function fetchMultipleAssetsMarketData(assetsIds: string[]): Promise<AssetIdToMarketData> {
   const query = getQueryString({...OPTIONS, ids: assetsIds.join(',')})
   const endpoint = `${COIN_GECKO_API_URL}${SIMPLE_PRICE_ENDPOINT}?${query}`
   const response = await fetch(endpoint, {
      method: 'GET',
   })
   const result: ResponseObject = await response.json()

   const assetIdToMarketData: AssetIdToMarketData = {}
   for (const key in result) {
      if (!result.hasOwnProperty(key)) {
         continue
      }
      assetIdToMarketData[key] = new MarketData(result[key].usd, result[key].usd_market_cap, result[key].usd_24h_change)
   }
   return assetIdToMarketData
}
