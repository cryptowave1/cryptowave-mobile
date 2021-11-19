export default class SymbolPair {
   private readonly baseSymbol: string
   private readonly quoteSymbol: string

   constructor(firstSymbol: string, secondSymbol: string) {
      this.baseSymbol = firstSymbol
      this.quoteSymbol = secondSymbol
   }

   getBaseSymbol(): string {
      return this.baseSymbol
   }

   getQuoteSymbol(): string {
      return this.quoteSymbol
   }
}
