import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";


export type FilterDocument = Filter & Document


@Schema()
export class Filter {
    @Prop({
        nullable: false,
        unique: true
    })
    field: string
    @Prop({
        nullable: false
    })
    type: string
    @Prop({
        nullable: false
    })
    group: string
    @Prop({
        default: [],
        type: [mongoose.Schema.Types.ObjectId]
    })
    categories: Array<string>
}

export const FilterSchema = SchemaFactory.createForClass(Filter)