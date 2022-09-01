import { BadRequestException, Inject, Injectable } from "@nestjs/common";
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
        console.log(categoryId)
        let category: Category = await this.categoryRepository.findById(categoryId)
        if (!category) throw new BadRequestException("Category doesn't exist!")

        let additionalFields: any[] = await this.categoryRepository.findParentHierarchyForCategory(categoryId)
        let parents = additionalFields[0]?.parents ? additionalFields[0].parents : []
        let resultFields: IAdditionalField[] = []
        let allFields: any[] = this.mapAllAdditionalFields(parents)
        allFields = [...allFields, ...category.additionalFields]

        allFields.forEach(field => {
            resultFields = this.addFieldIfDoesntExist(resultFields, field)
        })

        return resultFields
    }

    async findAllSubcategories(categoryId: string): Promise<string[]> {
        let subcategories: Object[] = await this.categoryRepository.findAllSubcategories(categoryId)
        return subcategories.map((subcategory: { _id: string; }) => subcategory._id)
    }

    private addFieldIfDoesntExist(fields: IAdditionalField[], field: IAdditionalField) {
        for (let prop of fields) {
            if (prop.field == field.field)
                return fields
        }
        fields.push(field)
        return fields
    }

    private mapAllAdditionalFields(parents) {
        let resultFields = []
        parents.forEach(parent => {
            resultFields = [...resultFields, ...parent.additionalFields]
        })
        return resultFields
    }

}