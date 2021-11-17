export default class Asset {
   private readonly name: string;
   private readonly symbol: string;
   private readonly imageUrl: string;

   constructor(name: string, symbol: string, imageUrl: string) {
      this.name = name;
      this.symbol = symbol;
      this.imageUrl = imageUrl;
   }

   getName(): string {
      return this.name;
   }

   getSymbol(): string {
      return this.symbol;
   }

   getImageUrl(): string {
      return this.imageUrl;
   }

   toString() {
      return this.getSymbol();
   }
}
