import { IFeatureBuilder } from "./feature-builder.interface"


export class FeatureBuilder implements IFeatureBuilder {

    constructor(private query: any, private params: any) { }

    public paginate() {
        let { page, limit = 20 } = this.params
        let toSkip = (page - 1) * limit

        if (page && page > 0) {
            return this.query.sort().skip(toSkip).limit(limit)
        }

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