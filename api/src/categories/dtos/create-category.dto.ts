import { IsNotEmpty } from "class-validator";
import { IAdditionalField } from "../interfaces/additional-field.interface";



export class CreateCategoryDTO {
    @IsNotEmpty()
    name: string
    parent: string
    children: Array<string>
    icon: string
    additionalFields: Array<IAdditionalField>
}