import { immerable } from 'immer'
import { FetchPairRecentTradesStrategy } from './fetch/FetchPairPriceStrategy'

export default class Exchange {
   [immerable] = true

   private readonly id: string
   private readonly name: string
   private fetchPairRecentTradesStratedy: FetchPairRecentTradesStrategy

   constructor(id: string, name: string, strategy: FetchPairRecentTradesStrategy) {
      this.id = id
      this.name = name
      this.fetchPairRecentTradesStratedy = strategy
   }

   getId(): string {
      return this.id
   }

   getName(): string {
      return this.name
   }

   toString(): string {
      return this.getId()
   }
}
