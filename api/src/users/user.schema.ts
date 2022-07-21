
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose"
import { UserRole } from "./enums/user-role.enum";

export type UserDocument = User & Document

@Schema()
export class User {
    @Prop({
        default: ""
    })
    name: string
    @Prop({
        default: ""
    })
    surname: string
    @Prop({
        unique: true
    })
    username: string
    @Prop({
        default: ""
    })
    password: string
    @Prop({
        unique: true
    })
    email: string
    @Prop({
        default: ""
    })
    description: string
    @Prop({
        default: ""
    })
    profileUrl: string
    @Prop({
        default: [UserRole.USER],
        nullable: false
    })
    roles: Array<UserRole> = [UserRole.USER]

}


export const UserSchema = SchemaFactory.createForClass(User)