import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Discount } from '@prisma/client';
import { JsonObject } from '@prisma/client/runtime/library';
import Page from '../common/dto/page.dto';
import { PrismaService } from '../common/prisma/prisma.service';
import { CreateDiscountDto } from './dto/create-discount.dto';

@Injectable()
export class DiscountService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateDiscountDto): Promise<Discount> {
    if (await this.prisma.discount.findUnique({ where: { key: data.key } })) {
      throw new ConflictException('Key already exists');
    }
    return await this.prisma.discount.create({
      data: {
        key: data.key,
        rule: data.rule as JsonObject,
      },
    });
  }

  async findAll(params: {
    skip: number;
    take: number;
    filter?: string;
  }): Promise<Page<Discount>> {
    const where = {
      key: {
        contains: params.filter,
      },
    };
    const data = await this.prisma.discount.findMany({
      skip: params.skip,
      take: params.take,
      where,
    });
    const total = await this.prisma.discount.count({ where });
    return {
      data,
      current: params.skip / params.take,
      total,
      size: params.take,
    };
  }

  async getAll(): Promise<Discount[]> {
    return await this.prisma.discount.findMany();
  }

  async findOne(key: string) {
    const result = await this.prisma.discount.findUnique({
      where: {
        key,
      },
    });
    if (!result) {
      throw new NotFoundException("Discount doesn't exist");
    }
    return result;
  }

  async remove(key: string): Promise<void> {
    const result = await this.prisma.discount.delete({
      where: {
        key,
      },
    });
    if (!result) {
      throw new NotFoundException("Discount doesn't exist");
    }
  }
}
