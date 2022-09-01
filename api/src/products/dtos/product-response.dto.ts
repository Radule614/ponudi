import { Expose } from "class-transformer";



export class ProductResponseDTO {
    @Expose()
    public _id: string

    @Expose()
    public content: string

    @Expose()
    public price: number

    @Expose()
    public owner: string

    @Expose()
    public category: string

    @Expose()
    public description?: string

    @Expose()
    public pictures?: Array<string>

    @Expose()
    public currency?: string

    @Expose()
    public additionalFields: Object = {}

}