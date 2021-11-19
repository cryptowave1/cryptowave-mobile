import { COIN_GECKO_API_URL } from './constants'
import { AssetsListItem } from '../../models/AssetsListItem'

const LIST_ENDPOINT = '/api/v3/coins/list'

export default async function fetchAssetsList(): Promise<AssetsListItem[]> {
   const endpoint = `${COIN_GECKO_API_URL}${LIST_ENDPOINT}`
   const response = await fetch(endpoint, {
      method: 'GET',
   })
   return await response.json()
}
