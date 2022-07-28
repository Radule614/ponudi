import { CategoryDocument } from "../category.schema";
import { CreateCategoryDTO } from "../dtos/create-category.dto";
import { SubcategoriesDTO } from "../dtos/subcategories.dto";

export interface ICategoryRepository {
    create(category: CreateCategoryDTO): Promise<CategoryDocument>
    findAll(): Promise<CategoryDocument[]>
    findAllPopulated(): Promise<SubcategoriesDTO[]>
    findAllSubcategories(categoryId: string): Promise<Object[]>
    findById(categoryId: string): Promise<CategoryDocument>
}