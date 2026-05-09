import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard'
import { CurrentUser } from '../common/decorators/current-user.decorator'
import { AttributesService } from './attributes.service'
import { CreateAttributeDto } from './dto/create-attribute.dto'
import { UpdateAttributeDto } from './dto/update-attribute.dto'

@ApiTags('attributes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('attributes')
export class AttributesController {
  constructor(private svc: AttributesService) {}

  @Get()
  @ApiOperation({ summary: 'لیست ویژگی‌ها' })
  findAll(@CurrentUser() user: any) {
    return this.svc.findAll(user.shopId)
  }

  @Get(':id')
  findOne(@CurrentUser() user: any, @Param('id') id: string) {
    return this.svc.findOne(user.shopId, id)
  }

  @Post()
  @ApiOperation({ summary: 'ایجاد ویژگی' })
  create(@CurrentUser() user: any, @Body() dto: CreateAttributeDto) {
    return this.svc.create(user.shopId, dto)
  }

  @Patch(':id')
  update(@CurrentUser() user: any, @Param('id') id: string, @Body() dto: UpdateAttributeDto) {
    return this.svc.update(user.shopId, id, dto)
  }

  @Delete()
  remove(@CurrentUser() user: any, @Body('ids') ids: string[]) {
    return this.svc.remove(user.shopId, ids)
  }
}
