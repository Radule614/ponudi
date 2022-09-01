import mongoose from "mongoose"
import { FieldType } from "src/categories/enums/field-type.enum"
import { IAdditionalField } from "src/categories/interfaces/additional-field.interface"
import { FeatureBuilderDTO } from "./feature-builder.dto"
import { IFeatureBuilder } from "./feature-builder.interface"
import { IDoubleSliderParams } from "./double-slider-params.interface"
import { FilterFactory } from "./filter.factory"


let standardFilters = [
    {
        field: 'price',
        type: FieldType.DOUBLE_SLIDER
    },
    {
        field: 'content',
        type: FieldType.SEARCH
    },
]


export class FeatureBuilder implements IFeatureBuilder {
    constructor(private query: any, private params: any, private filters: Array<IAdditionalField> = []) { }


    public paginate() {
        let { page = 1, limit = 20 } = this.params
        let toSkip = (page - 1) * limit

        if (page && page > 0) {
            this.query = this.query.skip(toSkip).limit(limit)
        }

        return this
    }

    public filter() {
        let acceptedFields = this.filterAcceptedFilterFields()

        let regularFilters = this.createFiltersFromArray(standardFilters)
        let additionalFilters = this.createFiltersFromArray(acceptedFields, true)
        let conditionArray = [...regularFilters, ...additionalFilters]

        if (conditionArray.length > 0)
            this.query.find({ $or: conditionArray })

        return this
    }

    private createFiltersFromArray(array: IAdditionalField[], additionalField = false) {
        let conditionArray = []
        array.forEach(param => {
            let queryArrayChunk = FilterFactory.createFilter(this.params, param, additionalField)
            if (queryArrayChunk) conditionArray.push(queryArrayChunk)
        })
        return conditionArray
    }

    private filterAcceptedFilterFields() {
        return this.filters.filter(filter => this.params[filter.field])
    }

    public calculatePages(docCount: number) {
        let { limit = 20 } = this.params
        return Math.floor(docCount / limit) + 1
    }

    public executeQuery() {
        return this.query.exec()
    }

    public cloneQuery() {
        return this.query.clone()
    }

    public async generateResponseFromOperations(): Promise<FeatureBuilderDTO> {
        let filteredQuery = this.filter().cloneQuery()
        let result = await this
            .paginate()
            .executeQuery()
        let count: number = (await filteredQuery.exec()).length

        return {
            data: result,
            count,
            pages: this.calculatePages(count)
        }
    }


}