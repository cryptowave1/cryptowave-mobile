import { immerable } from 'immer'
import AssetPairTrades from '../assets/AssetPairTrades'
import Exchange from './Exchange'
import { AssetPair } from '../assets/AssetPair'
import Trade from '../market/Trade'

export default class ExchangeTrades {
   [immerable] = true

   private readonly exchange: Exchange
   private readonly trades: Map<string, AssetPairTrades>

   constructor(exchange: Exchange) {
      this.exchange = exchange
      this.trades = new Map<string, AssetPairTrades>()
   }

   getExchange(): Exchange {
      return this.exchange
   }

   initAssetPairTrades(assetPair: AssetPair, trades?: Trade[], supported?: boolean) {
      this.trades.set(assetPair.toTicker(), new AssetPairTrades(assetPair, trades, supported))
   }

   getAssetPairTrades(assetPair?: AssetPair): AssetPairTrades | undefined {
      if (!assetPair) {
         return undefined
      }
      return this.trades.get(assetPair.toTicker())
   }

   setPairSupported(assetPair: AssetPair, supported: boolean): ExchangeTrades {
      if (!this.trades.get(assetPair.toTicker())) {
         this.initAssetPairTrades(assetPair, [], supported)
      }
      this.trades.get(assetPair.toTicker())!.setSupported(supported)
      return this
   }

   addPairTrades(assetPair: AssetPair, trades: Trade[]): ExchangeTrades {
      if (!this.trades.get(assetPair.toTicker())) {
         this.initAssetPairTrades(assetPair, trades, true)
      }
      this.trades.get(assetPair.toTicker())!.addTrades(trades)
      return this
   }
}
