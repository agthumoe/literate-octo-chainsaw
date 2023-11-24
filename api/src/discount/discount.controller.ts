import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
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
import { DiscountService } from './discount.service';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { Discount } from './entities/discount.entity';

@Controller('discounts')
@ApiExtraModels(Page)
@ApiTags('discounts')
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  @Post()
  @ApiCreatedResponse({ type: Discount })
  async create(@Body() dto: CreateDiscountDto) {
    return this.discountService.create(dto);
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
              items: { $ref: getSchemaPath(Discount) },
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
    return this.discountService.findAll({ skip, take, filter });
  }

  @Get(':key')
  @ApiOkResponse({ type: Discount })
  async findOne(@Param('key') key: string) {
    return this.discountService.findOne(key);
  }

  @Delete(':key')
  @ApiNoContentResponse()
  async remove(@Param('key') key: string, @Res() res: Response) {
    await this.discountService.remove(key);
    res.status(HttpStatus.NO_CONTENT).send();
  }
}
