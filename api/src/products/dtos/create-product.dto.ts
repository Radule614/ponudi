import { IsArray, IsNotEmpty, IsNumber, IsObject } from "class-validator";



export class CreateProductDTO {
    @IsNotEmpty()
    public content: string

    @IsNotEmpty()
    public price: number

    public owner: string

    @IsNotEmpty()
    public category: string

    public description?: string

    public pictures?: Array<string>

    public currency?: string

    @IsObject()
    @IsNotEmpty()
    public additionalFields: Object = {}

}