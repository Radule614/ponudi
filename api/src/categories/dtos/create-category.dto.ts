import { IsNotEmpty } from "class-validator";



export class CreateCategoryDTO {
    @IsNotEmpty()
    name: string
    parent: string
    children: Array<string>
    icon: string
}