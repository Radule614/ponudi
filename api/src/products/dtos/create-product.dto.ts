import { IsArray, IsNotEmpty, IsNumber, IsObject } from "class-validator";



export class CreateProductDTO {
    @IsNotEmpty()
    public content: string

    @IsNotEmpty()
    @IsNumber()
    public price: number

    @IsNotEmpty()
    public owner: string

    @IsNotEmpty()
    public category: string

    public description?: string

    public pictures?: Array<string>

    public currency?: string

    @IsObject()
    public additionalFields: Object = {}

}