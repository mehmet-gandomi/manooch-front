import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { CreateGalleryItemDto } from './dto/create-gallery-item.dto'
import { UpdateGalleryItemDto } from './dto/update-gallery-item.dto'

@Injectable()
export class GalleryService {
  constructor(private prisma: PrismaService) {}

  findAll(shopId: string) {
    return this.prisma.galleryItem.findMany({
      where: { shopId },
      orderBy: { priority: 'asc' },
    })
  }

  create(shopId: string, dto: CreateGalleryItemDto) {
    return this.prisma.galleryItem.create({ data: { ...dto, shopId } })
  }

  async update(shopId: string, id: string, dto: UpdateGalleryItemDto) {
    await this.assertOwns(shopId, id)
    return this.prisma.galleryItem.update({ where: { id }, data: dto })
  }

  async remove(shopId: string, ids: string[]) {
    await this.prisma.galleryItem.deleteMany({ where: { id: { in: ids }, shopId } })
  }

  private async assertOwns(shopId: string, id: string) {
    const item = await this.prisma.galleryItem.findFirst({ where: { id, shopId } })
    if (!item) throw new NotFoundException('آیتم گالری یافت نشد')
  }
}
