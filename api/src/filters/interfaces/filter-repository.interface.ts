import { CreateFilterDTO } from "../dtos/create-filter.dto";
import { FilterDocument } from "../filter.schema";

export interface IFilterRepository {
    create(filter: CreateFilterDTO): Promise<FilterDocument>
    findAllByCategory(categoryId: string): Promise<FilterDocument[]>
}