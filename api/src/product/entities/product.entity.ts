import { ApiProperty } from '@nestjs/swagger';
import { Product as PrismaProduct } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
export class Product implements PrismaProduct {
  @ApiProperty({ type: 'integer', description: 'The id of the product' })
  id: number;

  @ApiProperty({ type: 'string', description: 'The sku of the product' })
  sku: string;
  @ApiProperty({ type: 'string', description: 'The name of the product' })
  name: string;
  @ApiProperty({
    type: 'number',
    description: 'The description of the product',
  })
  price: Decimal;
}
