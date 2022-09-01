import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { ObjectId } from "mongoose";
import { IAdditionalField } from "./interfaces/additional-field.interface";


export type CategoryDocument = Category & Document

@Schema()
export class Category {
    @Prop({
        nullable: false
    })
    name: string

    @Prop({
        type: mongoose.Schema.Types.ObjectId
    })
    parent: string

    @Prop({
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Category',
        default: []
    })
    children: Array<mongoose.Schema.Types.ObjectId> = []

    @Prop()
    icon: string
    @Prop({
        type: Array<string>,
        default: []
    })
    additionalFields: Array<IAdditionalField> = []

}


export const CategorySchema = SchemaFactory.createForClass(Category)