import { IFeatureBuilder } from "./feature-builder.interface"


export class FeatureBuilder implements IFeatureBuilder {

    constructor(private query: any, private params: any) { }

    public paginate() {
        let { page = 1, limit = 20 } = this.params
        let toSkip = (page - 1) * limit

        if (page && page > 0) {
            this.query = this.query.sort().skip(toSkip).limit(limit)
        }

        return this
    }

    public filter() {
        let { filters } = this.params
        if (!filters) return this
        let { sort = 1, price } = filters
        let pipeline = []
        this.query = this.query.sort({ createdAt: sort })

        return this
    }

    public calculatePages(docCount: number) {
        let { limit = 20 } = this.params
        return Math.floor(docCount / limit) + 1
    }

    public executeQuery() {
        return this.query.exec()
    }
}