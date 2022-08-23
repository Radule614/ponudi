import { ObjectId } from "mongoose";
import { CategoryDocument } from "../category.schema";
import { IAdditionalField } from "../interfaces/additional-field.interface";

export class SubcategoriesDTO {
    public id?: ObjectId
    public name: string
    public icon: string
    public additionalFields?: Array<IAdditionalField>
    public children?: SubcategoriesDTO[]
}