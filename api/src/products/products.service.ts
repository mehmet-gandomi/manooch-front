import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'

const productInclude = {
  images: { orderBy: { order: 'asc' as const } },
  category: { select: { id: true, name: true } },
  featureEntries: {
    include: {
      attribute: { select: { id: true, name: true, type: true } },
      selections: true,
    },
  },
  unitSales: true,
}

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  findAll(shopId: string, categoryId?: string) {
    return this.prisma.product.findMany({
      where: { shopId, ...(categoryId ? { categoryId } : {}) },
      include: productInclude,
      orderBy: { createdAt: 'desc' },
    })
  }

  async findOne(shopId: string, id: string) {
    const product = await this.prisma.product.findFirst({
      where: { id, shopId },
      include: productInclude,
    })
    if (!product) throw new NotFoundException('محصول یافت نشد')
    return product
  }

  async create(shopId: string, dto: CreateProductDto) {
    const { imageUrls = [], featureEntries = [], unitSales = [], ...rest } = dto
    return this.prisma.product.create({
      data: {
        ...rest,
        shopId,
        images: { create: imageUrls.map((url, order) => ({ url, order })) },
        featureEntries: {
          create: featureEntries.map((fe) => ({
            attributeId: fe.attributeId,
            selections: { create: fe.selections },
          })),
        },
        unitSales: { create: unitSales },
      },
      include: productInclude,
    })
  }

  async update(shopId: string, id: string, dto: UpdateProductDto) {
    await this.assertOwns(shopId, id)
    const { imageUrls, featureEntries, unitSales, ...rest } = dto

    return this.prisma.$transaction(async (tx) => {
      if (imageUrls !== undefined) {
        await tx.productImage.deleteMany({ where: { productId: id } })
        await tx.productImage.createMany({
          data: imageUrls.map((url, order) => ({ productId: id, url, order })),
        })
      }
      if (featureEntries !== undefined) {
        const entries = await tx.productFeatureEntry.findMany({ where: { productId: id } })
        for (const e of entries) {
          await tx.featureSelection.deleteMany({ where: { featureEntryId: e.id } })
        }
        await tx.productFeatureEntry.deleteMany({ where: { productId: id } })
        for (const fe of featureEntries) {
          const entry = await tx.productFeatureEntry.create({
            data: { productId: id, attributeId: fe.attributeId },
          })
          await tx.featureSelection.createMany({
            data: fe.selections.map((s) => ({ ...s, featureEntryId: entry.id })),
          })
        }
      }
      if (unitSales !== undefined) {
        await tx.unitSale.deleteMany({ where: { productId: id } })
        await tx.unitSale.createMany({ data: unitSales.map((u) => ({ ...u, productId: id })) })
      }
      return tx.product.update({ where: { id }, data: rest, include: productInclude })
    })
  }

  async remove(shopId: string, ids: string[]) {
    await this.prisma.product.deleteMany({ where: { id: { in: ids }, shopId } })
  }

  private async assertOwns(shopId: string, id: string) {
    const p = await this.prisma.product.findFirst({ where: { id, shopId } })
    if (!p) throw new NotFoundException('محصول یافت نشد')
  }
}
