import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { ObjectId } from "mongoose";



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
}

export const CategorySchema = SchemaFactory.createForClass(Category)