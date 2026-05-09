import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { CreateAttributeDto } from './dto/create-attribute.dto'
import { UpdateAttributeDto } from './dto/update-attribute.dto'

@Injectable()
export class AttributesService {
  constructor(private prisma: PrismaService) {}

  findAll(shopId: string) {
    return this.prisma.attribute.findMany({
      where: { shopId },
      orderBy: { order: 'asc' },
    })
  }

  findOne(shopId: string, id: string) {
    return this.prisma.attribute.findFirst({ where: { id, shopId } })
  }

  create(shopId: string, dto: CreateAttributeDto) {
    return this.prisma.attribute.create({ data: { ...dto, shopId } })
  }

  async update(shopId: string, id: string, dto: UpdateAttributeDto) {
    await this.assertOwns(shopId, id)
    return this.prisma.attribute.update({ where: { id }, data: dto })
  }

  async remove(shopId: string, ids: string[]) {
    await this.prisma.attribute.deleteMany({ where: { id: { in: ids }, shopId } })
  }

  private async assertOwns(shopId: string, id: string) {
    const attr = await this.prisma.attribute.findFirst({ where: { id, shopId } })
    if (!attr) throw new NotFoundException('ویژگی یافت نشد')
  }
}
