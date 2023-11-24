import { Product } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export default interface Rule {
  apply: (products: Product[]) => Decimal;
}
