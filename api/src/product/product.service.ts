import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Product } from '@prisma/client';
import Page from 'src/common/dto/page.dto';
import { PrismaService } from '../common/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateProductDto): Promise<Product> {
    if (await this.prisma.product.findUnique({ where: { sku: data.sku } })) {
      throw new ConflictException('SKU already exists');
    }
    return this.prisma.product.create({
      data,
    });
  }

  async findAll(params: {
    skip: number;
    take: number;
    filter?: string;
  }): Promise<Page<Product>> {
    const where = {
      name: {
        contains: params.filter,
      },
    };
    const data = await this.prisma.product.findMany({
      skip: params.skip,
      take: params.take,
      where,
    });
    const total = await this.prisma.product.count({ where });
    return {
      data,
      current: params.skip / params.take,
      total,
      size: params.take,
    };
  }

  async findOne(sku: string): Promise<Product> {
    const result = await this.prisma.product.findUnique({
      where: {
        sku,
      },
    });
    if (!result) {
      throw new NotFoundException("Product doesn't exist");
    }
    return result;
  }

  async findBySkus(skus: string[]): Promise<Product[]> {
    const products = await Promise.all(
      skus.map(async (sku) => {
        const product = await this.prisma.product.findUnique({
          where: { sku },
        });
        if (!product) {
          throw new NotFoundException(`Product ${sku} doesn't exist`);
        }
        return product;
      }),
    );
    return products;
  }

  async update(
    sku: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    if (await this.prisma.product.findUnique({ where: { sku } })) {
      return this.prisma.product.update({
        where: {
          sku,
        },
        data: updateProductDto,
      });
    }
    throw new NotFoundException("Product doesn't exist");
  }

  async remove(sku: string): Promise<void> {
    if (await this.prisma.product.findUnique({ where: { sku } })) {
      await this.prisma.product.delete({
        where: {
          sku,
        },
      });
    } else {
      throw new NotFoundException("Product doesn't exist");
    }
  }
}
