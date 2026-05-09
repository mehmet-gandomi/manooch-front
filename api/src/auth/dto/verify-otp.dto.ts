import { IsString, Length, Matches } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class VerifyOtpDto {
  @ApiProperty({ example: '09123456789' })
  @IsString()
  @Matches(/^09[0-9]{9}$/, { message: 'شماره موبایل معتبر نیست' })
  phone: string

  @ApiProperty({ example: '12345' })
  @IsString()
  @Length(5, 5, { message: 'کد باید ۵ رقم باشد' })
  code: string
}
