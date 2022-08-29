import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose'
import { ProductModule } from './products/product.module';
import { CategoriesModule } from './categories/category.module';
import { MulterModule } from '@nestjs/platform-express';
import { ShopsModule } from './shops/shop.module';




const multerConfig = {
  dest: './upload',
  fileFilter(req, file, callback) {
    let allowedTypes = ['png', 'jpeg', 'jpg']
    if (allowedTypes.includes(file.mimetype)) {
      callback(null, true)
    } else {
      callback(new Error('File should be of type png jpeg or jpg!'), false)
    }
  },
}

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ProductModule,
    CategoriesModule,
    ShopsModule,
    MulterModule.register(multerConfig),
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(`mongodb+srv://srdjan:srkisrki11@e2chat.va4mk.mongodb.net/olx-clone?retryWrites=true&w=majority`),
    ShopsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
