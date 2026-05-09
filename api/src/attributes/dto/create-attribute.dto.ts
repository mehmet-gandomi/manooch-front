import { IsArray, IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { AttributeType } from '@prisma/client'

export class CreateAttributeDto {
  @ApiProperty()
  @IsString()
  name: string

  @ApiProperty({ enum: AttributeType })
  @IsEnum(AttributeType)
  type: AttributeType

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number

  @ApiPropertyOptional({ description: 'Array of values (objects for COLOR, strings for SIZE/TEXT)' })
  @IsOptional()
  @IsArray()
  values?: any[]
}
