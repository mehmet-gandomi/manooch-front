import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard'
import { CurrentUser } from '../common/decorators/current-user.decorator'
import { GalleryService } from './gallery.service'
import { CreateGalleryItemDto } from './dto/create-gallery-item.dto'
import { UpdateGalleryItemDto } from './dto/update-gallery-item.dto'

@ApiTags('gallery')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('gallery')
export class GalleryController {
  constructor(private svc: GalleryService) {}

  @Get()
  @ApiOperation({ summary: 'لیست گالری' })
  findAll(@CurrentUser() user: any) {
    return this.svc.findAll(user.shopId)
  }

  @Post()
  @ApiOperation({ summary: 'افزودن تصویر به گالری' })
  create(@CurrentUser() user: any, @Body() dto: CreateGalleryItemDto) {
    return this.svc.create(user.shopId, dto)
  }

  @Patch(':id')
  update(@CurrentUser() user: any, @Param('id') id: string, @Body() dto: UpdateGalleryItemDto) {
    return this.svc.update(user.shopId, id, dto)
  }

  @Delete()
  remove(@CurrentUser() user: any, @Body('ids') ids: string[]) {
    return this.svc.remove(user.shopId, ids)
  }
}
