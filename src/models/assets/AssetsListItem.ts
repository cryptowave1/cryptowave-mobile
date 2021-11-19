import { MarketData } from '../market/MarketData'

export interface AssetsListItem {
   id: string
   symbol: string
   name: string
   marketData?: MarketData
}

export const filterAssetsListItems = (assets: AssetsListItem[], label: string): AssetsListItem[] => {
   return assets.filter(asset =>
      asset.symbol.toLowerCase().indexOf(label.toLowerCase()) > -1 ||
      asset.name.toLowerCase().indexOf(label.toLowerCase()) > -1
   )
}
