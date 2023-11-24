import { Discount as PrismaDiscount } from '@prisma/client';
import { JsonObject } from '@prisma/client/runtime/library';

export class Discount implements PrismaDiscount {
  id: number;
  key: string;
  rule: JsonObject;
}
