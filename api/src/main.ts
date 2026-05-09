import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { TransformInterceptor } from './common/interceptors/transform.interceptor'
import { AllExceptionsFilter } from './common/filters/http-exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors({ origin: 'http://localhost:5173', credentials: true })

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))
  app.useGlobalInterceptors(new TransformInterceptor())
  app.useGlobalFilters(new AllExceptionsFilter())

  const config = new DocumentBuilder()
    .setTitle('Manooch API')
    .setDescription('پلتفرم فروشگاه آنلاین منوچ')
    .setVersion('1.0')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api-docs', app, document)

  const port = process.env.PORT ?? 3000
  await app.listen(port)
  console.log(`API running on http://localhost:${port}`)
  console.log(`Swagger docs: http://localhost:${port}/api-docs`)
}
bootstrap()
