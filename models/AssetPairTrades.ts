import { AssetPair } from './AssetPair'
import Trade from './Trade'

export default class AssetPairTrades {
   private readonly assetPair: AssetPair
   private readonly trades: Trade[]

   constructor(assetPair: AssetPair, trades: Trade[]) {
      this.assetPair = assetPair
      this.trades = trades
   }

   getAssetPair() {
      return this.assetPair
   }

   getTrades(): Trade[] {
      return this.trades
   }

   addTrades(trades: Trade[]) {
      this.trades.push(...trades)
   }

   toString() {
      return `${this.getAssetPair().getBaseAsset().toString()}_${this.getAssetPair().getQuoteAsset().toString()}`
   }
}
