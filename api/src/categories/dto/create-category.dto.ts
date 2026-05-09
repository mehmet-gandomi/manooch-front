import { IsInt, IsOptional, IsString, Min } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateCategoryDto {
  @ApiProperty()
  @IsString()
  name: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  imageSrc?: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  iconSrc?: string
}
