import { FeatureBuilderDTO } from "./feature-builder.dto"


export interface IFeatureBuilder {
    paginate()
    calculatePages(docCount: number): number
    executeQuery()
    filter()
    cloneQuery()
    generateResponseFromOperations(): Promise<FeatureBuilderDTO>


}