import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../common/prisma/prisma.service';
import { DiscountController } from './discount.controller';
import { DiscountService } from './discount.service';

describe('DiscountController', () => {
  let controller: DiscountController;
  let prismaService: PrismaService;
  let discountService: DiscountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiscountController],
      providers: [DiscountService, PrismaService],
    }).compile();

    controller = module.get<DiscountController>(DiscountController);
    prismaService = module.get<PrismaService>(PrismaService);
    discountService = module.get<DiscountService>(DiscountService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(prismaService).toBeDefined();
    expect(discountService).toBeDefined();
  });

  it('should return a discount', async () => {
    jest.spyOn(discountService, 'findOne').mockResolvedValue({
      id: 1,
      key: 'new-discount',
      rule: {
        sku: 'product-1',
      },
    });
    expect(await controller.findOne('new-discount')).toEqual({
      id: 1,
      key: 'new-discount',
      rule: {
        sku: 'product-1',
      },
    });
  });

  it('should create a discount', async () => {
    jest.spyOn(discountService, 'create').mockResolvedValue({
      id: 1,
      key: 'new-discount',
      rule: {
        sku: 'product-1',
      },
    });
    expect(
      await controller.create({
        key: 'new-discount',
        rule: {
          sku: 'product-1',
        },
      }),
    ).toEqual({
      id: 1,
      key: 'new-discount',
      rule: {
        sku: 'product-1',
      },
    });
  });

  it('should find all discounts', async () => {
    jest.spyOn(discountService, 'findAll').mockResolvedValue({
      data: [
        {
          id: 1,
          key: 'new-discount',
          rule: {
            sku: 'product-1',
          },
        },
      ],
      current: 0,
      total: 1,
      size: 10,
    });
    expect(await controller.findAll(0, 10)).toEqual({
      data: [
        {
          id: 1,
          key: 'new-discount',
          rule: {
            sku: 'product-1',
          },
        },
      ],
      current: 0,
      total: 1,
      size: 10,
    });
  });
});
