import PairPricing from '../models/PairPricing';
import SymbolPair from '../models/SymbolPair';
import { StrategyNotSetError } from '../errors/errors';
import AssetPairPricing from '../models/AssetPairPricing';
import { AssetPair } from '../models/AssetPair';

export class FetchPairPriceStrategyContext {
   private strategy?: FetchPairPriceStrategy;

   constructor(strategy?: FetchPairPriceStrategy) {
      this.strategy = strategy;
   }

   setStrategy(strategy: FetchPairPriceStrategy) {
      this.strategy = strategy;
   }

   async getPrices(assetPairs: AssetPair[]): Promise<AssetPairPricing[]> {
      if (!this.strategy) {
         throw new StrategyNotSetError();
      }

      const pairPricings: PairPricing[] = await this.strategy.getPrices(
         assetPairs.map(assetPair => assetPair.toSymbolPair())
      );

      return assetPairs.map(assetPair => new AssetPairPricing(
         assetPair.getBaseAsset(),
         assetPair.getQuoteAsset(),
         pairPricings.find(pairPricing =>
            pairPricing.getBaseAssetSymbol() === assetPair.getBaseAsset().getSymbol() &&
            pairPricing.getQuoteAssetSymbol() === assetPair.getQuoteAsset().getSymbol()
         )!
      ))

   }
}

export interface FetchPairPriceStrategy {
   getPreviousPrices(symbolPair: SymbolPair, intervalMs: number, from: Date): Promise<PairPricing[]>;

   getPrices(symbolPairs: SymbolPair[]): Promise<PairPricing[]>;
}
