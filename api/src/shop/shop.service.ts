import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { UpdateShopDto } from './dto/update-shop.dto'

@Injectable()
export class ShopService {
  constructor(private prisma: PrismaService) {}

  async getShop(shopId: string) {
    const shop = await this.prisma.shop.findUnique({ where: { id: shopId } })
    if (!shop) throw new NotFoundException('فروشگاه یافت نشد')
    return shop
  }

  async updateShop(shopId: string, dto: UpdateShopDto) {
    const { shopName, ...rest } = dto
    const data: any = { ...rest }
    if (shopName) data.name = shopName

    if (data.slug) {
      const existing = await this.prisma.shop.findFirst({
        where: { slug: data.slug, NOT: { id: shopId } },
      })
      if (existing) throw new ConflictException('این آدرس قبلاً استفاده شده است')
    }

    return this.prisma.shop.update({ where: { id: shopId }, data })
  }
}
