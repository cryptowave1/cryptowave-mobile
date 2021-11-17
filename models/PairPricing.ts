export default class PairPricing {
   private readonly baseAssetSymbol: string;
   private readonly quoteAssetSymbol: string;
   private supported: boolean;
   private askPrice?: number;
   private bidPrice?: number;

   constructor(baseAssetSymbol: string, quoteAssetSymbol: string, supported: boolean, askPrice?: number, bidPrice?: number) {
      this.baseAssetSymbol = baseAssetSymbol;
      this.quoteAssetSymbol = quoteAssetSymbol;
      this.supported = supported;
      this.askPrice = askPrice;
      this.bidPrice = bidPrice;
   }

   getBaseAssetSymbol(): string {
      return this.baseAssetSymbol;
   }

   getQuoteAssetSymbol(): string {
      return this.quoteAssetSymbol;
   }
}
