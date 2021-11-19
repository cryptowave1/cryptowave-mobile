import { AssetPair } from './AssetPair'
import Trade from './Trade'

export default class AssetPairTrades {
   private readonly assetPair: AssetPair
   private supported: boolean;
   private readonly trades: Trade[]

   constructor(assetPair: AssetPair, trades: Trade[] = [], supported = false) {
      this.assetPair = assetPair
      this.trades = trades
      this.supported = supported
   }

   getAssetPair() {
      return this.assetPair
   }

   setSupported(value: boolean) {
      this.supported = value
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
