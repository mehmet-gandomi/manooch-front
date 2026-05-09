import { IsOptional, IsString, Matches } from 'class-validator'
import { ApiPropertyOptional } from '@nestjs/swagger'

export class UpdateShopDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string

  @ApiPropertyOptional({ example: 'pizza-jivan' })
  @IsOptional()
  @IsString()
  @Matches(/^[a-z0-9-]+$/, { message: 'آدرس فروشگاه فقط حروف انگلیسی کوچک، اعداد و خط تیره' })
  slug?: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  logoUrl?: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  shopName?: string
}
