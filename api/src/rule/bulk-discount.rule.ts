import { Product } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import Rule from './rule';

export type BulkDiscountRuleProperties = {
  sku: string;
  appliedLimit: number;
  newPrice: number;
};
export default class BulkDiscountRule implements Rule {
  constructor(private readonly properties: BulkDiscountRuleProperties) {}
  apply(products: Product[]): Decimal {
    // count the number of products with the given sku
    const filteredProducts = products.filter(
      (product) => product.sku === this.properties.sku,
    );
    const count = filteredProducts.length;
    // calculate the discount
    if (count >= this.properties.appliedLimit) {
      return filteredProducts[0].price
        .mul(count)
        .sub(new Decimal(this.properties.newPrice).mul(count));
    }
    return new Decimal(0);
  }
}
