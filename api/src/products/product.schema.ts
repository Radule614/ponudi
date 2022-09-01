import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsNotEmpty } from "class-validator";
import mongoose from "mongoose";
import { BaseSchema } from "src/utils/base.schema";
import { IAddress } from "./interfaces/adress.interface";


export type ProductDocument = Product & Document


@Schema()
export class Product extends BaseSchema {
    @Prop({
        default: ""
    })
    content: string

    @Prop({
        default: 0
    })
    price: number

    @Prop({
        default: "KM"
    })
    currency: string

    @Prop({
        type: Object
    })
    location: IAddress

    @Prop({
        default: Date.now()
    })
    lastReneved: Date

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        nullable: false,
    })
    owner: string

    @Prop({
        default: ""
    })
    description: string

    @Prop({
        default: []
    })
    pictures: Array<string>

    @Prop({
        type: mongoose.Schema.Types.ObjectId
    })
    category: string

    @Prop({
        type: Object,
        default: {}
    })
    additionalFields: Object = {}
}


export const ProductSchema = SchemaFactory.createForClass(Product)



