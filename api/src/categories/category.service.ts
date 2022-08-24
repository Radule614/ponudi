import { Inject, Injectable } from "@nestjs/common";
import { Category } from "./category.schema";
import { CreateCategoryDTO } from "./dtos/create-category.dto";
import { IAdditionalField } from "./interfaces/additional-field.interface";
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

    async findCategoryAdditionalFields(categoryId: string): Promise<Array<IAdditionalField>> {
        let category: Category = await this.categoryRepository.findById(categoryId)
        if (!category) return []
        return category.additionalFields
    }

    async findAllSubcategories(categoryId: string): Promise<string[]> {
        let subcategories: Object[] = await this.categoryRepository.findAllSubcategories(categoryId)
        return subcategories.map((subcategory: { _id: string; }) => subcategory._id)
    }
}