import { immerable } from 'immer'

export default class Trade {
   [immerable] = true

   private readonly type: 'b' | 's'
   private readonly price: number
   private readonly baseQty: number
   private readonly timestamp: number

   constructor(type: 'b' | 's', price: number, baseQty: number, timestamp: number) {
      this.type = type
      this.price = price
      this.baseQty = baseQty
      this.timestamp = timestamp
   }

   getType() {
      return this.type
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
