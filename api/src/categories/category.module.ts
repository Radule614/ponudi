import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CategoryController } from "./category.controller";
import { CategoryRepository } from "./category.repository";
import { CategorySchema } from "./category.schema";
import { CategoryService } from "./category.service";



@Module({
    imports: [MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }])],
    controllers: [CategoryController],
    providers: [CategoryService, {
        provide: 'ICategoryRepository',
        useClass: CategoryRepository
    }],
    exports: [CategoryService],
})
export class CategoriesModule { }