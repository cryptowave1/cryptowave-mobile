import { immerable } from 'immer'

export default class Trade {
   [immerable] = true

   private readonly price: number
   private readonly baseQty: number
   private readonly timestamp: number

   constructor(price: number, baseQty: number, timestamp: number) {
      this.price = price
      this.baseQty = baseQty
      this.timestamp = timestamp
   }

   getPrice() {
      return this.price
   }

   getBaseQty() {
      return this.baseQty
   }

   getTimestamp() {
      return this.timestamp
   }
}
