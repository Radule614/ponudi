

export interface IFeatureBuilder {
    paginate()
    calculatePages(docCount: number): number
    executeQuery()
}