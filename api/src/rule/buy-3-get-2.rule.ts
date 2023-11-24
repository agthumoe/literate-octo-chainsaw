import { Product } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import Rule from './rule';

export type Buy3Get2RuleProperties = {
  sku: string;
};
export default class Buy3Get2Rule implements Rule {
  constructor(private readonly properties: Buy3Get2RuleProperties) {}
  apply(products: Product[]): Decimal {
    // filter products by skus
    const filteredProducts = products.filter(
      (product) => product.sku === this.properties.sku,
    );
    if (filteredProducts.length < 3) {
      return new Decimal(0);
    }
    // calculate the discount
    const discount = filteredProducts[0].price.mul(
      Math.floor(filteredProducts.length / 3),
    );
    return discount;
  }
}
