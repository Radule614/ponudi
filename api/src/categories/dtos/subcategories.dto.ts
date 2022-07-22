import { ObjectId } from "mongoose";
import { CategoryDocument } from "../category.schema";

export class SubcategoriesDTO {
    public id?: ObjectId
    public name: string
    public icon: string
    public children?: SubcategoriesDTO[]
}