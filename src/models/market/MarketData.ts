import { immerable } from 'immer'

export class MarketData {
   [immerable] = true

   private readonly priceUsd: number
   private readonly marketCap: number
   private readonly change24H: number

   constructor(priceUsd: number, marketCap: number, change24H: number) {
      this.priceUsd = priceUsd
      this.marketCap = marketCap
      this.change24H = change24H
   }

   getMarketCap() {
      return this.marketCap
   }
}
