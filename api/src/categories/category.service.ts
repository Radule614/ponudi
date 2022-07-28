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

    async findById(categoryId: string) {
        return await this.categoryRepository.findById(categoryId)
    }

    async findAllParentCategories() {
        return await this.categoryRepository.findAll()
    }

    async populateAllCategories() {
        return await this.categoryRepository.findAllPopulated()
    }

    async findAllSubcategories(categoryId: string): Promise<string[]> {
        let subcategories: Object[] = await this.categoryRepository.findAllSubcategories(categoryId)
        return subcategories.map((subcategory: { _id: string; }) => subcategory._id)
    }
}