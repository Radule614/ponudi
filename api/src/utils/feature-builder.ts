import mongoose from "mongoose"
import { FeatureBuilderDTO } from "./feature-builder.dto"
import { IFeatureBuilder } from "./feature-builder.interface"


export class FeatureBuilder implements IFeatureBuilder {
    constructor(private query: any, private params: any) { }

    public paginate() {
        let { page = 1, limit = 20 } = this.params
        let toSkip = (page - 1) * limit

        if (page && page > 0) {
            this.query = this.query.skip(toSkip).limit(limit)
        }

        return this
    }

    public filter() {
        let { sort = 1, price } = this.params

        this.query = this.filterByPrice(this.query, price)
        console.log(sort, price)
        console.log(this.query)
        this.query = this.query.sort({ createdAt: sort })
        return this
    }

    private filterByPrice(query, price) {
        if (!price) return query
        return query.where('price').gte(price.from).lt(price.to)
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
            count: result.length,
            pages: this.calculatePages(count)
        }
    }
}