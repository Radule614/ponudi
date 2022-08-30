import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CategoriesModule } from "src/categories/category.module";
import { StorageModule } from "src/storage/storage.module";
import { AttachProductMiddleware } from "./middlewares/attach-product.middleware";
import { ProductController } from "./product.controller";
import { ProductRepository } from "./product.repository";
import { ProductSchema } from "./product.schema";
import { ProductService } from "./product.service";




@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
        CategoriesModule,
        StorageModule
    ],
    controllers: [ProductController],
    providers: [ProductService, {
        provide: 'IProductRepository',
        useClass: ProductRepository
    }]
})
export class ProductModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AttachProductMiddleware)
            .exclude(
                {
                    path: '/products/category/*',
                    method: RequestMethod.ALL
                }
            )
            .forRoutes(
                {
                    path: '/products/pictures/:id',
                    method: RequestMethod.ALL
                },
                {
                    path: '/products/:id',
                    method: RequestMethod.ALL,
                }
            )
    }

}