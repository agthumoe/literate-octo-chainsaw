import { Discount } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { RuleService } from './rule.service';

describe('RuleService', () => {
  const service: RuleService = new RuleService();
  it('should apply rules', () => {
    const products = [
      {
        id: 1,
        sku: 'product-1',
        name: 'Product 1',
        price: new Decimal(100),
      },
      {
        id: 2,
        sku: 'product-2',
        name: 'Product 2',
        price: new Decimal(200),
      },
      {
        id: 3,
        sku: 'product-3',
        name: 'Product 3',
        price: new Decimal(300),
      },
    ];
    const rules = [
      {
        apply: jest.fn().mockReturnValue(new Decimal(10)),
      },
      {
        apply: jest.fn().mockReturnValue(new Decimal(20)),
      },
    ];
    expect(service.applyRule(products, rules)).toEqual(new Decimal(30));
    expect(rules[0].apply).toHaveBeenCalledWith(products);
    expect(rules[1].apply).toHaveBeenCalledWith(products);
  });

  describe('should build rule', () => {
    it('should build bulk discount rule', () => {
      const discount = {
        id: 1,
        key: 'bulk-discount',
        rule: {
          sku: 'product-1',
          appliedLimit: 3,
          newPrice: 10,
        },
      } as Discount;
      expect(service.buildDiscountRule(discount as Discount)).toBeDefined();
    });

    it('should build buy 1 get another free rule', () => {
      const discount = {
        id: 1,
        key: 'buy-1-get-another-free',
        rule: {
          buy1Sku: 'product-1',
          getAnotherSku: 'product-2',
        },
      } as Discount;
      expect(service.buildDiscountRule(discount as Discount)).toBeDefined();
    });

    it('should build buy 3 get 2 rule', () => {
      const discount = {
        id: 1,
        key: 'buy-3-get-2',
        rule: {
          sku: 'product-1',
        },
      } as Discount;
      expect(service.buildDiscountRule(discount as Discount)).toBeDefined();
    });

    it('should return null for unknown rule', () => {
      const discount = {
        id: 1,
        key: 'unknown-rule',
        rule: {
          sku: 'product-1',
        },
      } as Discount;
      expect(service.buildDiscountRule(discount as Discount)).toBeNull();
    });
  });

  describe('testing rules', () => {
    it('should apply bulk discount rule', () => {
      const products = [
        {
          id: 1,
          sku: 'ipd',
          name: 'Super iPad',
          price: new Decimal(549.99),
        },
        {
          id: 1,
          sku: 'ipd',
          name: 'Super iPad',
          price: new Decimal(549.99),
        },
        {
          id: 1,
          sku: 'ipd',
          name: 'Super iPad',
          price: new Decimal(549.99),
        },
      ];
      const rule = service.buildDiscountRule({
        id: 1,
        key: 'bulk-discount',
        rule: {
          sku: 'ipd',
          appliedLimit: 3,
          newPrice: 499.99,
        },
      } as Discount);
      expect(rule.apply(products)).toEqual(new Decimal((549.99 - 499.99) * 3));
    });

    it('should apply buy 1 get another free rule', () => {
      const products = [
        {
          id: 1,
          sku: 'mbp',
          name: 'MacBook Pro',
          price: new Decimal(1399.99),
        },
        {
          id: 2,
          sku: 'vga',
          name: 'VGA adapter',
          price: new Decimal(30),
        },
      ];
      const rule = service.buildDiscountRule({
        id: 1,
        key: 'buy-1-get-another-free',
        rule: {
          buy1Sku: 'mbp',
          getAnotherSku: 'vga',
        },
      } as Discount);
      expect(rule.apply(products)).toEqual(new Decimal(30));
    });

    it('should apply buy 3 get 2 rule', () => {
      const products = [
        {
          id: 1,
          sku: 'atv',
          name: 'Apple TV',
          price: new Decimal(109.5),
        },
        {
          id: 2,
          sku: 'atv',
          name: 'Apple TV',
          price: new Decimal(109.5),
        },
        {
          id: 3,
          sku: 'atv',
          name: 'Apple TV',
          price: new Decimal(109.5),
        },
        {
          id: 4,
          sku: 'vga',
          name: 'VGA adapter',
          price: new Decimal(30),
        },
      ];
      const rule = service.buildDiscountRule({
        id: 1,
        key: 'buy-3-get-2',
        rule: {
          sku: 'atv',
        },
      } as Discount);
      expect(rule.apply(products)).toEqual(new Decimal(109.5));
    });
  });
});
