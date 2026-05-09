import { Body, Controller, Post } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { RequestOtpDto } from './dto/request-otp.dto'
import { VerifyOtpDto } from './dto/verify-otp.dto'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('request-otp')
  @ApiOperation({ summary: 'درخواست کد OTP' })
  requestOtp(@Body() dto: RequestOtpDto) {
    return this.auth.requestOtp(dto.phone)
  }

  @Post('verify-otp')
  @ApiOperation({ summary: 'تأیید کد OTP و دریافت توکن' })
  verifyOtp(@Body() dto: VerifyOtpDto) {
    return this.auth.verifyOtp(dto.phone, dto.code)
  }
}
