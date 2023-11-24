import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const products = [
  {
    sku: 'ipd',
    name: 'Super iPad',
    price: 549.99,
  },
  {
    sku: 'mbp',
    name: 'MacBook Pro',
    price: 1399.99,
  },
  {
    sku: 'atv',
    name: 'Apple TV',
    price: 109.5,
  },
  {
    sku: 'vga',
    name: 'VGA adapter',
    price: 30,
  },
];

const discounts = [
  {
    key: 'buy-3-get-2',
    rule: {
      sku: 'atv',
    },
  },
  {
    key: 'bulk-discount',
    rule: {
      sku: 'ipd',
      appliedLimit: 4,
      newPrice: 499.99,
    },
  },
  {
    key: 'buy-1-get-another-free',
    rule: {
      buy1Sku: 'mbp',
      getAnotherSku: 'vga',
    },
  },
];

async function main() {
  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }
  for (const discount of discounts) {
    await prisma.discount.create({
      data: discount,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
