import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The product sku' })
  sku: string;
  @ApiProperty({ description: 'The product name' })
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty({ description: 'The product price' })
  @IsNumber()
  @IsPositive()
  price: number;
}
