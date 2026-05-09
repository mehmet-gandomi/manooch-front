import { Controller, Get, NotFoundException, Param, Query } from '@nestjs/common'
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger'
import { PrismaService } from '../prisma.service'

@ApiTags('public')
@Controller('public')
export class PublicController {
  constructor(private prisma: PrismaService) {}

  @Get(':slug')
  @ApiOperation({ summary: 'اطلاعات فروشگاه (عمومی)' })
  async getShop(@Param('slug') slug: string) {
    const shop = await this.prisma.shop.findUnique({
      where: { slug },
      select: { id: true, name: true, slug: true, description: true, logoUrl: true },
    })
    if (!shop) throw new NotFoundException('فروشگاه یافت نشد')
    return shop
  }

  @Get(':slug/products')
  @ApiOperation({ summary: 'محصولات فروشگاه (عمومی)' })
  @ApiQuery({ name: 'categoryId', required: false })
  async getProducts(@Param('slug') slug: string, @Query('categoryId') categoryId?: string) {
    const shop = await this.findShopOrThrow(slug)
    return this.prisma.product.findMany({
      where: { shopId: shop.id, ...(categoryId ? { categoryId } : {}) },
      include: {
        images: { orderBy: { order: 'asc' }, take: 1 },
        category: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: 'desc' },
    })
  }

  @Get(':slug/products/:productId')
  @ApiOperation({ summary: 'جزئیات محصول (عمومی)' })
  async getProduct(@Param('slug') slug: string, @Param('productId') productId: string) {
    const shop = await this.findShopOrThrow(slug)
    const product = await this.prisma.product.findFirst({
      where: { id: productId, shopId: shop.id },
      include: {
        images: { orderBy: { order: 'asc' } },
        category: { select: { id: true, name: true } },
        featureEntries: {
          include: {
            attribute: { select: { id: true, name: true, type: true } },
            selections: true,
          },
        },
        unitSales: true,
      },
    })
    if (!product) throw new NotFoundException('محصول یافت نشد')
    return product
  }

  @Get(':slug/categories')
  @ApiOperation({ summary: 'دسته‌بندی‌های فروشگاه (عمومی)' })
  async getCategories(@Param('slug') slug: string) {
    const shop = await this.findShopOrThrow(slug)
    return this.prisma.category.findMany({
      where: { shopId: shop.id },
      orderBy: { order: 'asc' },
    })
  }

  @Get(':slug/gallery')
  @ApiOperation({ summary: 'گالری فروشگاه (عمومی)' })
  async getGallery(@Param('slug') slug: string) {
    const shop = await this.findShopOrThrow(slug)
    return this.prisma.galleryItem.findMany({
      where: { shopId: shop.id },
      orderBy: { priority: 'asc' },
    })
  }

  private async findShopOrThrow(slug: string) {
    const shop = await this.prisma.shop.findUnique({ where: { slug } })
    if (!shop) throw new NotFoundException('فروشگاه یافت نشد')
    return shop
  }
}
