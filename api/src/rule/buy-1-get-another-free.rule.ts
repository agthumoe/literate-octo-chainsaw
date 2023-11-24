import { Product } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import Rule from './rule';

export type Buy1GetAnotherFreeRuleProperties = {
  buy1Sku: string;
  getAnotherSku: string;
};

export default class Buy1GetAnotherFree implements Rule {
  constructor(private readonly properties: Buy1GetAnotherFreeRuleProperties) {}
  apply(products: Product[]): Decimal {
    // filter products by skus
    const buy1Products = products.filter(
      (product) => product.sku === this.properties.buy1Sku,
    );
    // filter get another products by skus
    const getAnotherProducts = products.filter(
      (product) => product.sku === this.properties.getAnotherSku,
    );
    if (buy1Products.length < 1 || getAnotherProducts.length < 1) {
      return new Decimal(0);
    }
    // calculate the discount
    const discount = getAnotherProducts[0].price.mul(
      Math.min(buy1Products.length, getAnotherProducts.length),
    );
    return discount;
  }
}
