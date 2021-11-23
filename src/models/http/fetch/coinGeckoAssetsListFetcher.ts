import HttpRequestStrategy from './HttpFetchStrategy'
import { AssetsListItem } from '../../assets/AssetsListItem'
import { COIN_GECKO_API_URL } from './constants'

const LIST_ENDPOINT = '/api/v3/coins/list'
const coinGeckoAssetsListFetcher = new HttpRequestStrategy<AssetsListItem[], void, AssetsListItem[]>(
   () => {
      return {
         method: 'GET' as const,
         endpoint: `${COIN_GECKO_API_URL}${LIST_ENDPOINT}`,
      }
   }
)
export default coinGeckoAssetsListFetcher
