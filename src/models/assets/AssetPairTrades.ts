import { immerable } from 'immer'
import { AssetPair } from './AssetPair'
import Trade from '../market/Trade'

export default class AssetPairTrades {
   [immerable] = true

   private readonly assetPair: AssetPair
   private supported?: boolean
   private readonly trades: Trade[]

   constructor(assetPair: AssetPair, trades: Trade[] = [], supported?: boolean) {
      this.assetPair = assetPair
      this.trades = trades
      this.supported = supported
   }

   getAssetPair() {
      return this.assetPair
   }

   getSupported(): boolean | undefined {
      return this.supported
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
}
