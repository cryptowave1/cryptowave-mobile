import SymbolPair from '../../models/SymbolPair'
import { StrategyNotSetError } from '../../errors/errors'
import { AssetPair } from '../../models/AssetPair'
import Trade from '../../models/Trade'

export class FetchPairTradesStrategyContext {
   private strategy?: FetchPairTradesStrategy

   constructor(strategy?: FetchPairTradesStrategy) {
      this.strategy = strategy
   }

   setStrategy(strategy: FetchPairTradesStrategy) {
      this.strategy = strategy
   }

   async fetchRecentTrades(assetPair: AssetPair, limit = 1): Promise<Trade[]> {
      if (!this.strategy) {
         throw new StrategyNotSetError()
      }

      return this.strategy!.fetchRecentTrades(assetPair.toSymbolPair(), limit)
   }
}

export interface FetchPairTradesStrategy {
   fetchRecentTrades(symbolPairs: SymbolPair, limit?: number): Promise<Trade[]>
}
