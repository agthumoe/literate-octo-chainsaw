import { Test, TestingModule } from '@nestjs/testing';
import { Decimal } from '@prisma/client/runtime/library';
import { PrismaService } from '../common/prisma/prisma.service';
import { DiscountService } from '../discount/discount.service';
import { ProductService } from '../product/product.service';
import { RuleController } from './rule.controller';
import { RuleService } from './rule.service';

describe('RuleController', () => {
  let controller: RuleController;
  let prismaService: PrismaService;
  let discountService: DiscountService;
  let productService: ProductService;
  let ruleService: RuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RuleController],
      providers: [RuleService, DiscountService, ProductService, PrismaService],
    }).compile();

    controller = module.get<RuleController>(RuleController);
    discountService = module.get<DiscountService>(DiscountService);
    productService = module.get<ProductService>(ProductService);
    prismaService = module.get<PrismaService>(PrismaService);
    ruleService = module.get<RuleService>(RuleService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(discountService).toBeDefined();
    expect(productService).toBeDefined();
    expect(prismaService).toBeDefined();
    expect(ruleService).toBeDefined();
  });

  it('should return a discount', async () => {
    jest.spyOn(discountService, 'getAll').mockResolvedValue([
      {
        id: 1,
        key: 'new-discount',
        rule: {
          sku: 'product-1',
        },
      },
    ]);
    jest.spyOn(productService, 'findBySkus').mockResolvedValue([
      {
        id: 1,
        sku: 'product-1',
        name: 'Product 1',
        price: new Decimal(100),
      },
    ]);
    jest.spyOn(ruleService, 'buildDiscountRule').mockReturnValue({
      apply: jest.fn().mockReturnValue(new Decimal(10)),
    });
    jest.spyOn(ruleService, 'applyRule').mockReturnValue(new Decimal(10));
    expect(await controller.applyDiscounts(['product-1'])).toEqual(
      new Decimal(10),
    );
    expect(discountService.getAll).toHaveBeenCalled();
    expect(productService.findBySkus).toHaveBeenCalledWith(['product-1']);
    expect(ruleService.buildDiscountRule).toHaveBeenCalledWith({
      id: 1,
      key: 'new-discount',
      rule: {
        sku: 'product-1',
      },
    });
  });
});
