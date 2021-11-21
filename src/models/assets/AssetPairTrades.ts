import { immerable } from 'immer'
import { AssetPair } from './AssetPair'
import Trade from '../market/Trade'
import getArrayLastItem from '../../utils/functions/getArrayLastItem';
import { SortValue } from '../common/SortValue';

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

   getLastPrice(): number | undefined {
      return getArrayLastItem(this.getTrades())?.getPrice()
   }

   public static sortAssetPairTrades(assets: (AssetPairTrades | undefined)[], sortValue: SortValue):
      (AssetPairTrades | undefined)[] {
      return assets
         .filter(trades => !!trades)
         .sort((left: (AssetPairTrades | undefined), right: (AssetPairTrades | undefined)) => {
            if (!left?.getLastPrice() && !right?.getLastPrice()) {
               return 0
            }
            if (!left?.getLastPrice()) {
               return -1
            }
            if (!right?.getLastPrice()) {
               return 1
            }
            if (sortValue === 'asc') {
               return left.getLastPrice()! - right.getLastPrice()!
            }
            return right.getLastPrice()! - left.getLastPrice()!
         })
   }
}
