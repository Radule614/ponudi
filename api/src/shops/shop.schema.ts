import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { ILocation } from "./interfaces/location.interface"


export type ShopDocument = Shop & Document


@Schema()
export class Shop {
    @Prop({
        default: "",
        type: String
    })
    name: string

    @Prop({
        type: Object,
        default: { longitude: "", latitude: "" }
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
}



export const ShopSchema = SchemaFactory.createForClass(Shop)