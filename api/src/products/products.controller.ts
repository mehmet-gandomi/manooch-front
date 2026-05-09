import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard'
import { CurrentUser } from '../common/decorators/current-user.decorator'
import { ProductsService } from './products.service'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'

@ApiTags('products')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private svc: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'لیست محصولات' })
  @ApiQuery({ name: 'categoryId', required: false })
  findAll(@CurrentUser() user: any, @Query('categoryId') categoryId?: string) {
    return this.svc.findAll(user.shopId, categoryId)
  }

  @Get(':id')
  findOne(@CurrentUser() user: any, @Param('id') id: string) {
    return this.svc.findOne(user.shopId, id)
  }

  @Post()
  @ApiOperation({ summary: 'ایجاد محصول' })
  create(@CurrentUser() user: any, @Body() dto: CreateProductDto) {
    return this.svc.create(user.shopId, dto)
  }

  @Patch(':id')
  update(@CurrentUser() user: any, @Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.svc.update(user.shopId, id, dto)
  }

  @Delete()
  remove(@CurrentUser() user: any, @Body('ids') ids: string[]) {
    return this.svc.remove(user.shopId, ids)
  }
}
