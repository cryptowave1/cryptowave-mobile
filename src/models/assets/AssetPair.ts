import { immerable } from 'immer'
import Asset from './Asset'
import SymbolPair from './SymbolPair'

export class AssetPair {
   [immerable] = true

   private readonly baseAsset: Asset
   private readonly quoteAsset: Asset

   constructor(baseAsset: Asset, quoteAsset: Asset) {
      this.baseAsset = baseAsset
      this.quoteAsset = quoteAsset
   }

   getBaseAsset(): Asset {
      return this.baseAsset
   }

   getQuoteAsset(): Asset {
      return this.quoteAsset
   }

   toSymbolPair(): SymbolPair {
      return new SymbolPair(this.baseAsset.getSymbol(), this.quoteAsset.getSymbol())
   }

   toTicker(): string {
      return `${this.getBaseAsset().getSymbol()}_${this.getQuoteAsset().getSymbol()}`
   }

   toReadableTicker(): string {
      return `${this.getBaseAsset().getSymbol().toUpperCase()} - ${this.getQuoteAsset().getSymbol().toUpperCase()}`
   }
}
