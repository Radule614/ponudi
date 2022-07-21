import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsNotEmpty } from "class-validator";
import mongoose from "mongoose";
import { IAddress } from "./interfaces/adress.interface";


export type ProductDocument = Product & Document


@Schema()
export class Product {
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
        default: Date.now()
    })
    createdAt: Date

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
}


export const ProductSchema = SchemaFactory.createForClass(Product)




