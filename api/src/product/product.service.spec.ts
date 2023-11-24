import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../common/prisma/prisma.service';
import { ProductService } from './product.service';

const mockedProducts = [
  {
    id: 1,
    sku: 'product-1',
    name: 'Product 1',
    price: 9.99,
  },
  {
    id: 2,
    sku: 'product-2',
    name: 'Product 2',
    price: 19.99,
  },
  {
    id: 3,
    sku: 'product-3',
    name: 'Product 3',
    price: 29.99,
  },
];

const mockedPrisma = {
  product: {
    create: jest.fn((params) => Promise.resolve({ ...params.data, id: 1 })),
    findMany: jest.fn(() => Promise.resolve(mockedProducts)),
    findUnique: jest.fn((params) =>
      Promise.resolve(mockedProducts.find((p) => p.sku === params.where.sku)),
    ),
    update: jest.fn((params) =>
      Promise.resolve({
        ...mockedProducts.find((p) => p.sku === params.where.sku),
        ...params.data,
      }),
    ),
    delete: jest.fn(),
    count: jest.fn(() => Promise.resolve(mockedProducts.length)),
  },
};
describe('ProductService', () => {
  let service: ProductService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockedPrisma)
      .compile();

    service = module.get<ProductService>(ProductService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prismaService).toBeDefined();
  });

  it('should create a product', async () => {
    const product = await service.create({
      sku: 'new-product',
      name: 'Product 1',
      price: 9.99,
    });
    expect(prismaService.product.findUnique).toHaveBeenCalledWith({
      where: { sku: 'new-product' },
    });
    expect(prismaService.product.create).toHaveBeenCalledWith({
      data: {
        sku: 'new-product',
        name: 'Product 1',
        price: 9.99,
      },
    });
    expect(product).toEqual({
      id: 1,
      sku: 'new-product',
      name: 'Product 1',
      price: 9.99,
    });
  });

  it('should throw an error on duplicate sku create', async () => {
    await expect(
      service.create({
        sku: 'product-1',
        name: 'Product 1',
        price: 9.99,
      }),
    ).rejects.toThrow('SKU already exists');
  });

  it('should find all products', async () => {
    const result = await service.findAll({
      skip: 0,
      take: 10,
      filter: '',
    });

    expect(prismaService.product.findMany).toHaveBeenCalledWith({
      skip: 0,
      take: 10,
      where: {
        name: {
          contains: '',
        },
      },
    });

    expect(result).toEqual({
      data: mockedProducts,
      current: 0,
      total: 3,
      size: 10,
    });
  });

  it('should find a product', async () => {
    const product = await service.findOne('product-1');

    expect(prismaService.product.findUnique).toHaveBeenCalledWith({
      where: { sku: 'product-1' },
    });
    expect(product).toEqual({
      id: 1,
      sku: 'product-1',
      name: 'Product 1',
      price: 9.99,
    });
  });

  it('should throw an error on non-existing sku findOne', async () => {
    await expect(service.findOne('product-4')).rejects.toThrow(
      "Product doesn't exist",
    );
  });
  it('should update a product', async () => {
    const product = await service.update('product-1', {
      name: 'Product 1 Updated',
    });

    expect(prismaService.product.findUnique).toHaveBeenCalledWith({
      where: { sku: 'product-1' },
    });

    expect(product).toEqual({
      id: 1,
      sku: 'product-1',
      name: 'Product 1 Updated',
      price: 9.99,
    });
  });

  it('should throw an error on updating with non-existing sku', async () => {
    await expect(
      service.update('product-4', {
        name: 'Product 4',
      }),
    ).rejects.toThrow("Product doesn't exist");
  });
});
