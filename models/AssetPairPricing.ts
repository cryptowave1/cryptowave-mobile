import Asset from './Asset';
import PairPricing from './PairPricing';

export default class AssetPairPricing {
   private readonly baseAsset: Asset;
   private readonly quoteAsset: Asset;
   private readonly pricing: PairPricing;

   constructor(baseAsset: Asset, quoteAsset: Asset, pricing: PairPricing) {
      this.baseAsset = baseAsset;
      this.quoteAsset = quoteAsset;
      this.pricing = pricing;
   }

   getBaseAsset(): Asset {
      return this.baseAsset;
   }

   getQuoteAsset(): Asset {
      return this.quoteAsset;
   }


   toString() {
      return `${this.baseAsset.toString()}_${this.quoteAsset.toString()}`;
   }
}
