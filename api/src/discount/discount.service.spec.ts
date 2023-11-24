import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../common/prisma/prisma.service';
import { DiscountService } from './discount.service';

const mockedDiscounts = [
  {
    id: 1,
    key: 'discount-1',
    rule: {
      sku: 'product-1',
    },
  },
  {
    id: 2,
    key: 'discount-2',
    rule: {
      buyOneSku: 'product-2',
      getOneSku: 'product-3',
    },
  },
  {
    id: 3,
    key: 'discount-3',
    rule: {
      sku: 'product-4',
      quantity: 3,
    },
  },
];

const mockedPrisma = {
  discount: {
    create: jest.fn((params) => Promise.resolve({ ...params.data, id: 1 })),
    findMany: jest.fn(() => Promise.resolve(mockedDiscounts)),
    findUnique: jest.fn((params) =>
      Promise.resolve(mockedDiscounts.find((p) => p.key === params.where.key)),
    ),
    update: jest.fn((params) =>
      Promise.resolve({
        ...mockedDiscounts.find((p) => p.key === params.where.key),
        ...params.data,
      }),
    ),
    delete: jest.fn(),
    count: jest.fn(() => Promise.resolve(mockedDiscounts.length)),
  },
};
describe('DiscountService', () => {
  let service: DiscountService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiscountService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockedPrisma)
      .compile();

    service = module.get<DiscountService>(DiscountService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prismaService).toBeDefined();
  });

  it('should create a discount', async () => {
    const discount = await service.create({
      key: 'new-discount',
      rule: {
        sku: 'product-1',
      },
    });
    expect(prismaService.discount.findUnique).toHaveBeenCalledWith({
      where: { key: 'new-discount' },
    });
    expect(prismaService.discount.create).toHaveBeenCalledWith({
      data: {
        key: 'new-discount',
        rule: {
          sku: 'product-1',
        },
      },
    });
    expect(discount).toEqual({
      id: 1,
      key: 'new-discount',
      rule: {
        sku: 'product-1',
      },
    });
  });

  it('should find all discounts', async () => {
    const discounts = await service.findAll({
      skip: 0,
      take: 10,
      filter: '',
    });
    expect(prismaService.discount.findMany).toHaveBeenCalledWith({
      skip: 0,
      take: 10,
      where: {
        key: {
          contains: '',
        },
      },
    });
    expect(prismaService.discount.count).toHaveBeenCalledWith({
      where: {
        key: {
          contains: '',
        },
      },
    });
    expect(discounts).toEqual({
      data: mockedDiscounts,
      current: 0,
      total: 3,
      size: 10,
    });
  });

  it('should get all discounts', async () => {
    const discounts = await service.getAll();
    expect(prismaService.discount.findMany).toHaveBeenCalledWith();
    expect(discounts).toEqual(mockedDiscounts);
  });

  it('should find one discount', async () => {
    const discount = await service.findOne('discount-1');
    expect(prismaService.discount.findUnique).toHaveBeenCalledWith({
      where: { key: 'discount-1' },
    });
    expect(discount).toEqual(mockedDiscounts[0]);
  });
});
