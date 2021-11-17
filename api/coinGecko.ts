import Asset from '../models/Asset';
import { getQueryString } from '../utils/getQueryString';

const COIN_GECKO_API_URL = 'https://api.coingecko.com';
const MARKETS_ENDPOINT = '/api/v3/coins/markets';
const COMPARATOR = 'market_cap_desc';
const VS_CURRENCY = 'usd';

interface CoinGeckoResponseObject {
   symbol: string;
   name: string;
   image: string;
   market_cap: number;
}

export default async function fetchAssets(resultsPerPage: number, pageNumber: number): Promise<Asset[]> {
   const params = getQueryString({
      order: COMPARATOR,
      vs_currency: VS_CURRENCY,
      per_page: resultsPerPage,
      page: pageNumber
   })
   const endpoint = `${COIN_GECKO_API_URL}${MARKETS_ENDPOINT}?${params}`;

   // todo akolov: error handling
   const response = await fetch(endpoint, {
      method: 'GET',
   });
   let result: CoinGeckoResponseObject[] = await response.json();

   return result
      .sort((first, second) => second.market_cap - first.market_cap)
      .map((asset: CoinGeckoResponseObject) => new Asset(asset.name, asset.symbol, asset.image));
}
