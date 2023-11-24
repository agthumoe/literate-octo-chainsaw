import { Injectable } from '@nestjs/common';
import { Discount, Product } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import BulkDiscountRule, {
  BulkDiscountRuleProperties,
} from './bulk-discount.rule';
import Buy1GetAnotherFree, {
  Buy1GetAnotherFreeRuleProperties,
} from './buy-1-get-another-free.rule';
import Buy3Get2Rule, { Buy3Get2RuleProperties } from './buy-3-get-2.rule';
import Rule from './rule';

@Injectable()
export class RuleService {
  applyRule(products: Product[], rules: Rule[]): Decimal {
    // loop products and apply rules
    let discount = new Decimal(0);
    for (const rule of rules) {
      discount = discount.add(rule.apply(products));
    }
    return discount;
  }

  buildDiscountRule(discount: Discount): Rule {
    switch (discount.key) {
      case 'bulk-discount':
        return new BulkDiscountRule(
          discount.rule as BulkDiscountRuleProperties,
        );
      case 'buy-1-get-another-free':
        return new Buy1GetAnotherFree(
          discount.rule as Buy1GetAnotherFreeRuleProperties,
        );
      case 'buy-3-get-2':
        return new Buy3Get2Rule(discount.rule as Buy3Get2RuleProperties);
      default:
        return null;
    }
  }
}
