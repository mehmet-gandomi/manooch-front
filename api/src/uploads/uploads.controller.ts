import {
  Controller, Post, UploadedFile, UseGuards, UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { extname } from 'path'
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard'

@ApiTags('uploads')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('uploads')
export class UploadsController {
  @Post('image')
  @ApiOperation({ summary: 'آپلود تصویر' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (_req, file, cb) => {
          const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
          cb(null, `${unique}${extname(file.originalname)}`)
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
      fileFilter: (_req, file, cb) => {
        const allowed = /image\/(jpeg|jpg|png|webp|gif)/
        cb(null, allowed.test(file.mimetype))
      },
    }),
  )
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return { url: `/uploads/${file.filename}` }
  }
}
