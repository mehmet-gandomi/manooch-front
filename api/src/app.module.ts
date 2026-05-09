import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { AuthModule } from './auth/auth.module'
import { ShopModule } from './shop/shop.module'
import { CategoriesModule } from './categories/categories.module'
import { AttributesModule } from './attributes/attributes.module'
import { ProductsModule } from './products/products.module'
import { GalleryModule } from './gallery/gallery.module'
import { UploadsModule } from './uploads/uploads.module'
import { PublicModule } from './public/public.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    AuthModule,
    ShopModule,
    CategoriesModule,
    AttributesModule,
    ProductsModule,
    GalleryModule,
    UploadsModule,
    PublicModule,
  ],
})
export class AppModule {}
