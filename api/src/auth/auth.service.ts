import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '../prisma.service'

const DEV_OTP = '12345'

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async requestOtp(phone: string) {
    const code = process.env.NODE_ENV === 'production'
      ? String(Math.floor(10000 + Math.random() * 90000))
      : DEV_OTP

    const expiresAt = new Date(Date.now() + 2 * 60 * 1000) // 2 minutes

    await this.prisma.otpCode.create({ data: { phone, code, expiresAt } })

    // TODO: send real SMS via Kavenegar in production
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[DEV OTP] phone=${phone} code=${code}`)
    }

    return { success: true }
  }

  async verifyOtp(phone: string, code: string) {
    const otp = await this.prisma.otpCode.findFirst({
      where: {
        phone,
        code,
        used: false,
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: 'desc' },
    })

    if (!otp) throw new BadRequestException('کد وارد شده نادرست یا منقضی شده است')

    await this.prisma.otpCode.update({ where: { id: otp.id }, data: { used: true } })

    const user = await this.prisma.user.upsert({
      where: { phone },
      create: { phone },
      update: {},
    })

    let shop = await this.prisma.shop.findUnique({ where: { userId: user.id } })
    if (!shop) {
      shop = await this.prisma.shop.create({ data: { userId: user.id } })
    }

    const payload = { sub: user.id, shopId: shop.id }
    const accessToken = this.jwt.sign(payload)

    return {
      accessToken,
      user: { id: user.id, phone: user.phone, name: user.name, shopName: shop.name, shopSlug: shop.slug },
    }
  }
}
