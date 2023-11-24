import { Module } from '@nestjs/common';
import { DiscountService } from 'src/discount/discount.service';
import { ProductService } from 'src/product/product.service';
import { RuleController } from './rule.controller';
import { RuleService } from './rule.service';

@Module({
  providers: [RuleService, DiscountService, ProductService],
  controllers: [RuleController],
})
export class RuleModule {}
