import { Prop } from "@nestjs/mongoose";



export class BaseSchema {
    @Prop({
        type: Date,
        deafult: Date.now()
    })
    createdAt: Date
}