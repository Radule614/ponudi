import { Inject, Injectable } from "@nestjs/common";
import { CreateFilterDTO } from "./dtos/create-filter.dto";
import { IFilterRepository } from "./interfaces/filter-repository.interface";



@Injectable()
export class FilterService {
    constructor(@Inject('IFilterRepository') private readonly filterRepository: IFilterRepository) { }

    public async create(filter: CreateFilterDTO) {
        return await this.filterRepository.create(filter)
    }

    public async findFiltersForCategory(categoryId) {
        return await this.filterRepository.findAllByCategory(categoryId)
    }



}