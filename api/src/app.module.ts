import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './common/prisma/prisma.module';
import { DiscountModule } from './discount/discount.module';
import { ProductModule } from './product/product.module';
import { RuleModule } from './rule/rule.module';

@Module({
  imports: [PrismaModule, ProductModule, DiscountModule, RuleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
