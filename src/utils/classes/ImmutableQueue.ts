import { immerable } from 'immer'

export default class ImmutableQueue<T> {
   [immerable] = true

   private readonly items: T[]
   private readonly maxSize: number

   constructor(maxSize: number) {
      this.items = []
      this.maxSize = maxSize
   }

   getItems(): T[] {
      return this.items
   }

   getLength(): number {
      return this.items.length
   }

   enqueue(items: T | T[]): ImmutableQueue<T> {
      if (Array.isArray(items)) {
         this.items.push(...items)
      } else {
         this.items.push(items)
      }
      if (this.getLength() > this.maxSize) {
         this.dequeue(this.getLength() - this.maxSize)
      }
      return this
   }

   dequeue(count: number): T[] {
      return this.items.splice(0, count)
   }

   peek(): T | void {
      if (this.getItems()) {
         return this.items.shift()
      }
   }
}
