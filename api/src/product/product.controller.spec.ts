import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { PrismaService } from '../common/prisma/prisma.service';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

const mockedProducts = [
  {
    id: 1,
    sku: 'product-1',
    name: 'Product 1',
    price: new Prisma.Decimal(9.99),
  },
  {
    id: 2,
    sku: 'product-2',
    name: 'Product 2',
    price: new Prisma.Decimal(19.99),
  },
  {
    id: 3,
    sku: 'product-3',
    name: 'Product 3',
    price: new Prisma.Decimal(29.99),
  },
];
describe('ProductController', () => {
  let controller: ProductController;
  let prismaService: PrismaService;
  let productService: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService, PrismaService],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    prismaService = module.get<PrismaService>(PrismaService);
    productService = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(prismaService).toBeDefined();
    expect(productService).toBeDefined();
  });

  it('should return a product', async () => {
    jest.spyOn(productService, 'findOne').mockResolvedValue(mockedProducts[0]);
    expect(await controller.findOne('product-1')).toEqual(mockedProducts[0]);
  });

  it('should create a product', async () => {
    jest.spyOn(productService, 'create').mockResolvedValue(mockedProducts[0]);
    expect(
      await controller.create({
        sku: 'product-1',
        name: 'Product 1',
        price: 9.99,
      }),
    ).toEqual(mockedProducts[0]);
  });

  it('should delete a product', async () => {
    jest.spyOn(productService, 'remove').mockResolvedValue(undefined);
    const response: Partial<Response> = {
      json: jest.fn().mockReturnValue(undefined),
      status: jest
        .fn()
        .mockImplementation()
        .mockReturnValue({
          send: jest.fn().mockReturnValue(HttpStatus.NO_CONTENT),
        }),
    };
    expect(
      await controller.remove('product-1', response as Response),
    ).toBeUndefined();
  });

  it('should update a product', async () => {
    jest.spyOn(productService, 'update').mockResolvedValue(mockedProducts[0]);
    expect(
      await controller.update('product-1', {
        name: 'Product 1',
        price: 9.99,
      }),
    ).toEqual(mockedProducts[0]);
  });

  it('should return an array of products', async () => {
    jest.spyOn(productService, 'findAll').mockResolvedValue({
      data: mockedProducts,
      current: 0,
      total: mockedProducts.length,
      size: 10,
    });
    expect(await controller.findAll(0, 10)).toEqual({
      data: mockedProducts,
      current: 0,
      total: mockedProducts.length,
      size: 10,
    });
  });
});
