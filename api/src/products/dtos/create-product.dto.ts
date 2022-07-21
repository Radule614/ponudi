import { IsNotEmpty } from "class-validator";



export class CreateProductDTO {
    @IsNotEmpty()
    public content: string

    @IsNotEmpty()
    public price: number

    @IsNotEmpty()
    public owner: string

    public description?: string

    public pictures?: Array<string>

}