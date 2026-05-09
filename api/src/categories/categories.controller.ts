import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard'
import { CurrentUser } from '../common/decorators/current-user.decorator'
import { CategoriesService } from './categories.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'

@ApiTags('categories')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('categories')
export class CategoriesController {
  constructor(private svc: CategoriesService) {}

  @Get()
  @ApiOperation({ summary: 'لیست دسته‌بندی‌ها' })
  findAll(@CurrentUser() user: any) {
    return this.svc.findAll(user.shopId)
  }

  @Get(':id')
  findOne(@CurrentUser() user: any, @Param('id') id: string) {
    return this.svc.findOne(user.shopId, id)
  }

  @Post()
  @ApiOperation({ summary: 'ایجاد دسته‌بندی' })
  create(@CurrentUser() user: any, @Body() dto: CreateCategoryDto) {
    return this.svc.create(user.shopId, dto)
  }

  @Patch(':id')
  update(@CurrentUser() user: any, @Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    return this.svc.update(user.shopId, id, dto)
  }

  @Delete()
  remove(@CurrentUser() user: any, @Body('ids') ids: string[]) {
    return this.svc.remove(user.shopId, ids)
  }
}
