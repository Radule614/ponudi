import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { Mongoose } from "mongoose"
import { BaseSchema } from "src/utils/base.schema"
import { ShopLevel } from "./enums/shop-level.enum"
import { ILocation } from "./interfaces/location.interface"


export type ShopDocument = Shop & Document


@Schema()
export class Shop extends BaseSchema {
    @Prop({
        default: "",
        type: String,
        nullable: false
    })
    name: string

    @Prop({
        type: Object,
        default: { longitude: "", latitude: "" },
        nullable: false
    })
    location: ILocation

    @Prop({
        type: String,
        default: ""
    })
    adress: string

    @Prop({
        type: String,
        default: ""
    })
    telephoneNumber: string

    @Prop({
        type: String,
        default: "",
        nullable: false
    })
    serviceType: string

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        default: null
    })
    owner: string

    @Prop({
        default: ShopLevel.BRONZE,
        nullable: false
    })
    shopLevel: ShopLevel
}



export const ShopSchema = SchemaFactory.createForClass(Shop)