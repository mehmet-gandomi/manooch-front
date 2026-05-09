import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard'
import { CurrentUser } from '../common/decorators/current-user.decorator'
import { ShopService } from './shop.service'
import { UpdateShopDto } from './dto/update-shop.dto'

@ApiTags('shop')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('shop')
export class ShopController {
  constructor(private shop: ShopService) {}

  @Get()
  @ApiOperation({ summary: 'اطلاعات فروشگاه من' })
  getShop(@CurrentUser() user: any) {
    return this.shop.getShop(user.shopId)
  }

  @Patch()
  @ApiOperation({ summary: 'ویرایش فروشگاه' })
  updateShop(@CurrentUser() user: any, @Body() dto: UpdateShopDto) {
    return this.shop.updateShop(user.shopId, dto)
  }
}
