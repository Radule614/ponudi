import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AttachShopMiddleware } from './middlewares/attach-shop.middleware';
import { ShopController } from './shop.controller';
import { ShopRepository } from './shop.repository';
import { ShopSchema } from './shop.schema';
import { ShopService } from './shop.service';

@Module({
  controllers: [ShopController],
  imports: [
    MongooseModule.forFeature([{ schema: ShopSchema, name: "Shop" }])
  ],
  providers: [
    ShopService,
    {
      useClass: ShopRepository,
      provide: 'IShopRepository'
    }
  ]
})
export class ShopsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AttachShopMiddleware)
      .forRoutes(
        {
          path: '/shops/:id',
          method: RequestMethod.ALL
        }
      )
  }

}
