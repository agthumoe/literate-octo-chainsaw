import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiExtraModels,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { Response } from 'express';
import Page from '../common/dto/page.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';

@Controller('products')
@ApiExtraModels(Page)
@ApiTags('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiCreatedResponse({ type: Product })
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(Page) },
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(Product) },
            },
          },
        },
      ],
    },
  })
  @ApiQuery({ name: 'skip', required: false, type: Number })
  @ApiQuery({ name: 'take', required: false, type: Number })
  @ApiQuery({ name: 'filter', required: false, type: String })
  async findAll(
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number,
    @Query('filter') filter?: string,
  ) {
    return this.productService.findAll({ skip, take, filter });
  }

  @Get(':sku')
  @ApiOkResponse({ type: Product })
  async findOne(@Param('sku') sku: string) {
    return this.productService.findOne(sku);
  }

  @Patch(':sku')
  async update(
    @Param('sku') sku: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(sku, updateProductDto);
  }

  @Delete(':sku')
  @ApiNoContentResponse()
  async remove(@Param('sku') sku: string, @Res() res: Response) {
    await this.productService.remove(sku);
    res.status(HttpStatus.NO_CONTENT).send();
  }
}
