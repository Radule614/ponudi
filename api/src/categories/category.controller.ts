import { Body, Controller, Get, Post } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CreateCategoryDTO } from "./dtos/create-category.dto";



@Controller('categories')
export class CategoryController {

    constructor(
        private readonly categoryService: CategoryService
    ) { }

    @Post('/')
    async create(@Body() category: CreateCategoryDTO) {
        return this.categoryService.create(category)
    }

    @Get('/')
    async getAllParent() {
        return this.categoryService.findAllParentCategories()
    }

    @Get('/populated')
    async getAllCategoriesPopulated() {
        return this.categoryService.populateAllCategories()
    }
}