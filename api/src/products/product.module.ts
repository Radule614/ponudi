import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CategoriesModule } from "src/categories/category.module";
import { FirebaseStorageModule } from "src/firebase/firebase.module";
import { ProductController } from "./product.controller";
import { ProductRepository } from "./product.repository";
import { ProductSchema } from "./product.schema";
import { ProductService } from "./product.service";




@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
        CategoriesModule,
        FirebaseStorageModule
    ],
    controllers: [ProductController],
    providers: [ProductService, {
        provide: 'IProductRepository',
        useClass: ProductRepository
    }]
})
export class ProductModule { }