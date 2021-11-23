import { immerable } from 'immer'
import HttpFetchStrategy from '../http/HttpFetchStrategy'
import SymbolPair from '../assets/SymbolPair'

export interface FetchRecentTradesArguments {
   symbolPair: SymbolPair
   limit?: number
}

export default class Exchange {
   [immerable] = true

   private readonly id: string
   private readonly name: string
   private readonly fetchPairRecentTradesStrategy: HttpFetchStrategy<any, FetchRecentTradesArguments, any>

   constructor(id: string, name: string, fetchPairRecentTradesStrategy:
      HttpFetchStrategy<any, { symbolPair: SymbolPair, limit: number }, any>) {
      this.id = id
      this.name = name
      this.fetchPairRecentTradesStrategy = fetchPairRecentTradesStrategy
   }

   getId(): string {
      return this.id
   }

   getName(): string {
      return this.name
   }

   getFetchPairRecentTradesStrategy(): HttpFetchStrategy<any, FetchRecentTradesArguments, any> {
      return this.fetchPairRecentTradesStrategy
   }

   toString(): string {
      return this.getId()
   }
}
