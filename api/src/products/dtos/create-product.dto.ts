import { Expose } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsObject } from "class-validator";



export class CreateProductDTO {
    @Expose()
    @IsNotEmpty()
    public content: string

    @Expose()
    @IsNotEmpty()
    public price: number

    @Expose()
    public owner: string

    @Expose()
    @IsNotEmpty()
    public category: string

    @Expose()
    public description?: string

    @Expose()
    public pictures?: Array<string>

    @Expose()
    public currency?: string

    @Expose()
    @IsObject()
    @IsNotEmpty()
    public additionalFields: Object = {}

}