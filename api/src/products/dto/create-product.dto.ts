import { Type } from 'class-transformer'
import {
  IsArray, IsBoolean, IsInt, IsOptional, IsString, Min, ValidateNested,
} from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

class FeatureSelectionDto {
  @IsString() name: string
  @IsOptional() @IsString() hex?: string
  @IsOptional() @IsInt() @Min(0) inventory?: number
  @IsOptional() @IsInt() @Min(0) price?: number
}

class FeatureEntryDto {
  @IsString() attributeId: string
  @IsArray() @ValidateNested({ each: true }) @Type(() => FeatureSelectionDto)
  selections: FeatureSelectionDto[]
}

class UnitSaleDto {
  @IsString() name: string
  @IsInt() @Min(0) price: number
  @IsInt() @Min(1) quantity: number
  @IsInt() @Min(0) inventory: number
}

export class CreateProductDto {
  @ApiProperty() @IsString() name: string

  @ApiPropertyOptional() @IsOptional() @IsString() description?: string
  @ApiPropertyOptional() @IsOptional() @IsString() code?: string
  @ApiPropertyOptional() @IsOptional() @IsString() categoryId?: string

  @ApiProperty() @IsInt() @Min(0) basePrice: number
  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(0) discountedPrice?: number
  @ApiPropertyOptional() @IsOptional() @IsBoolean() hasDiscount?: boolean
  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(0) inventory?: number
  @ApiPropertyOptional() @IsOptional() @IsBoolean() hasVoiceDescription?: boolean
  @ApiPropertyOptional() @IsOptional() @IsString() voiceUrl?: string

  @ApiPropertyOptional({ type: [String] })
  @IsOptional() @IsArray() @IsString({ each: true })
  imageUrls?: string[]

  @ApiPropertyOptional()
  @IsOptional() @IsArray() @ValidateNested({ each: true }) @Type(() => FeatureEntryDto)
  featureEntries?: FeatureEntryDto[]

  @ApiPropertyOptional()
  @IsOptional() @IsArray() @ValidateNested({ each: true }) @Type(() => UnitSaleDto)
  unitSales?: UnitSaleDto[]
}
