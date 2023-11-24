import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DiscountService } from '../discount/discount.service';
import { ProductService } from '../product/product.service';
import { RuleService } from './rule.service';

@Controller('rules')
@ApiTags('rules')
export class RuleController {
  constructor(
    private readonly ruleService: RuleService,
    private readonly discountService: DiscountService,
    private readonly productService: ProductService,
  ) {}

  @Post()
  async applyDiscounts(@Body() skus: string[]) {
    const products = await this.productService.findBySkus(skus);
    const discounts = await this.discountService.getAll();
    const rules = discounts.map((discount) =>
      this.ruleService.buildDiscountRule(discount),
    );
    return this.ruleService.applyRule(products, rules);
  }
}
