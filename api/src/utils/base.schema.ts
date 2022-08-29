import { Prop, Schema } from "@nestjs/mongoose";



@Schema()
export class BaseSchema {
    @Prop({
        type: Date,
        deafult: Date.now()
    })
    createdAt: Date
}