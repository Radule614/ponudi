import { Injectable } from "@nestjs/common";
import { IUserRepository } from "./interfaces/user-repository.interface";
import { User, UserDocument } from "./user.schema";
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"



@Injectable()
export class UserRepository implements IUserRepository {
    constructor(
        @InjectModel('User') private UserModel: Model<UserDocument>
    ) { }

    findById(id: string): Promise<UserDocument> {
        return this.UserModel.findById(id).exec()
    }

    create(user: Object): Promise<UserDocument> {
        const newUser = new this.UserModel(user)
        return newUser.save()
    }

    findBy(params: Object): Promise<UserDocument> {
        return this.UserModel.findOne(params).exec()
    }

    findByUsername(username: string): Promise<UserDocument> {
        return this.UserModel.findOne({ username }).exec()
    }

    findAll(): Promise<UserDocument[]> {
        return this.UserModel.find({}).exec()
    }

}