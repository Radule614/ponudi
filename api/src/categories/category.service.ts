import { Inject, Injectable } from "@nestjs/common";
import { Category } from "./category.schema";
import { CreateCategoryDTO } from "./dtos/create-category.dto";
import { ICategoryRepository } from "./interfaces/category-repository.interface";




@Injectable()
export class CategoryService {

    constructor(
        @Inject('ICategoryRepository') private categoryRepository: ICategoryRepository
    ) { }

    async create(category: CreateCategoryDTO): Promise<Category> {
        let newCategory: Category = await this.categoryRepository.create(category)
        return newCategory
    }

    async findAllParentCategories() {
        return await this.categoryRepository.findAll()
    }

    async populateAllCategories() {
        return await this.categoryRepository.findAllPopulated()
    }
}