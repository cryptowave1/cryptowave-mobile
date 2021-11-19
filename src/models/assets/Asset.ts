import { immerable } from 'immer'
import { MarketData } from '../market/MarketData'

export default class Asset {
   [immerable] = true

   private readonly id: string
   private readonly name: string
   private readonly symbol: string
   private readonly imageUrl: string
   private marketData: MarketData

   constructor(name: string, symbol: string, id: string, imageUrl: string, marketData: MarketData) {
      this.name = name
      this.symbol = symbol
      this.id = id
      this.imageUrl = imageUrl
      this.marketData = marketData
   }

   public static findAsset(assets: Asset[], symbol: string): Asset | undefined {
      return assets.find(asset => asset.getSymbol().toLowerCase() === symbol.toLowerCase())
   }

   public static filterAssets(assets: Asset[], label: string): Asset[] {
      return assets.filter(asset =>
         asset.getSymbol().toLowerCase().indexOf(label.toLowerCase()) > -1 ||
         asset.getName().toLowerCase().indexOf(label.toLowerCase()) > -1)
   }

   public static sortAssetsByMarketCap(assets: Asset[]): Asset[] {
      return assets.sort((firstAsset: Asset, secondAsset: Asset) =>
         secondAsset.getMarketData().getMarketCap() - firstAsset.getMarketData().getMarketCap())
   }

   getName(): string {
      return this.name
   }

   getSymbol(): string {
      return this.symbol
   }

   getId(): string {
      return this.id
   }

   getImageUrl(): string {
      return this.imageUrl
   }

   getMarketData(): MarketData {
      return this.marketData
   }

   setMarketData(marketData: MarketData) {
      this.marketData = marketData
   }

   toString() {
      return this.getId()
   }
}
