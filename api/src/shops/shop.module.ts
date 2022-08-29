import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
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
export class ShopsModule { }
