
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose"
import { BaseSchema } from "src/utils/base.schema";
import { UserRole } from "./enums/user-role.enum";

export type UserDocument = User & Document

@Schema()
export class User extends BaseSchema {
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

    @Prop({
        type: Boolean,
        default: false
    })
    isEmailVerified: boolean = false

}

export const UserSchema = SchemaFactory.createForClass(User)