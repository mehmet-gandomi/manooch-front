import { IsInt, IsOptional, IsString, Min } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateGalleryItemDto {
  @ApiProperty()
  @IsString()
  imageSrc: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(0)
  priority?: number
}
