import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { Category, CategoryDocument } from "./category.schema";
import { CreateCategoryDTO } from "./dtos/create-category.dto";
import { SubcategoriesDTO } from "./dtos/subcategories.dto";
import { ICategoryRepository } from "./interfaces/category-repository.interface";

@Injectable()
export class CategoryRepository implements ICategoryRepository {

    constructor(
        @InjectModel('Category') private CategoryModel: Model<CategoryDocument>
    ) { }

    public async create(category: CreateCategoryDTO): Promise<CategoryDocument> {
        let newCategory = new this.CategoryModel(category)
        let createdCategory = await newCategory.save()
        let children: ObjectId = createdCategory.id

        if (createdCategory.parent) {
            await this.CategoryModel
                .findOne({ _id: createdCategory.parent })
                .update({ $push: { children } })
                .exec()
        }
        return createdCategory;
    }

    public async findAll(): Promise<CategoryDocument[]> {
        let parentCategories: CategoryDocument[] = await this.CategoryModel.find({ parent: null }).exec()
        return parentCategories
    }

    public async findAllPopulated(): Promise<SubcategoriesDTO[]> {
        let parentCategories: any[] = await this.findAll()
        let categoriesTree: SubcategoriesDTO[] = []

        for (let category of parentCategories) {
            let categoryTree: SubcategoriesDTO[] = await this.deepPopulateChildren(category.children)
            let categoryDto: SubcategoriesDTO = this.createDtoFromDocument(category, category._id)
            categoryDto.children = categoryTree
            categoriesTree.push(categoryDto)
        }
        return categoriesTree
    }

    private async deepPopulateChildren(children: ObjectId[]): Promise<SubcategoriesDTO[]> {
        if (children.length == 0) return []
        let resultArray: SubcategoriesDTO[] = []

        for (let child of children) {
            let childPopulated: Category = await this.CategoryModel.findById(child)
            let dto: SubcategoriesDTO = this.createDtoFromDocument(childPopulated, child)
            dto.children = await this.deepPopulateChildren(childPopulated.children)
            resultArray.push(dto)
        }
        return resultArray
    }


    private createDtoFromDocument(document: Category, id: any): SubcategoriesDTO {
        return {
            name: document.name,
            icon: document.icon,
            id
        }
    }

}