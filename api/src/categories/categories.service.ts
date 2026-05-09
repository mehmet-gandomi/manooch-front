import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  findAll(shopId: string) {
    return this.prisma.category.findMany({
      where: { shopId },
      orderBy: { order: 'asc' },
    })
  }

  findOne(shopId: string, id: string) {
    return this.prisma.category.findFirst({ where: { id, shopId } })
  }

  create(shopId: string, dto: CreateCategoryDto) {
    return this.prisma.category.create({ data: { ...dto, shopId } })
  }

  async update(shopId: string, id: string, dto: UpdateCategoryDto) {
    await this.assertOwns(shopId, id)
    return this.prisma.category.update({ where: { id }, data: dto })
  }

  async remove(shopId: string, ids: string[]) {
    await this.prisma.category.deleteMany({ where: { id: { in: ids }, shopId } })
  }

  private async assertOwns(shopId: string, id: string) {
    const cat = await this.prisma.category.findFirst({ where: { id, shopId } })
    if (!cat) throw new NotFoundException('دسته‌بندی یافت نشد')
  }
}
