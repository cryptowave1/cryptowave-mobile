export default class Exchange {
   private readonly id: string;
   private readonly name: string;

   constructor(id: string, name: string) {
      this.id = id;
      this.name = name;
   }

   getId(): string {
      return this.id;
   }

   getName(): string {
      return this.name;
   }

   toString(): string {
      return this.getName();
   }
}
