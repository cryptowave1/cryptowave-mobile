import { immerable } from 'immer'
import { AssetPair } from './AssetPair'
import Trade from '../market/Trade'
import getArrayLastItem from '../../utils/functions/getArrayLastItem'
import { SortValue } from '../common/SortValue'

export default class AssetPairTrades {
   [immerable] = true

   private static readonly TRADES_MAX_COUNT: number = 2000;

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
      if (trades.length > AssetPairTrades.TRADES_MAX_COUNT) {
         this.trades.splice(0, trades.length - AssetPairTrades.TRADES_MAX_COUNT)
      }
   }

   getLastPrice(): number | undefined {
      return getArrayLastItem(this.getTrades())?.getPrice()
   }

   public static getComparatorValue(left: (AssetPairTrades | undefined), right: (AssetPairTrades | undefined),
                                    sortValue: SortValue): number {
      if (!left?.getLastPrice() && !right?.getLastPrice()) {
         return 0
      }
      if (sortValue === 'asc') {
         if (!left?.getLastPrice()) {
            return -1
         }
         if (!right?.getLastPrice()) {
            return 1
         }
      } else {
         if (!left?.getLastPrice()) {
            return 1
         }
         if (!right?.getLastPrice()) {
            return -1
         }
      }

      if (sortValue === 'asc') {
         return left.getLastPrice()! - right.getLastPrice()!
      }
      return right.getLastPrice()! - left.getLastPrice()!
   }
}
