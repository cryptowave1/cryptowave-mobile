export default class Trade {
   private price: number
   private baseQty: number
   private timestamp: number

   constructor(price: number, baseQty: number, timestamp: number) {
      this.price = price
      this.baseQty = baseQty
      this.timestamp = timestamp
   }
}
