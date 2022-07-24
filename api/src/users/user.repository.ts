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

    public findById(id: string): Promise<UserDocument> {
        return this.UserModel.findById(id).exec()
    }

    public create(user: Object): Promise<UserDocument> {
        const newUser = new this.UserModel(user)
        return newUser.save()
    }

    public findBy(params: Object): Promise<UserDocument> {
        return this.UserModel.findOne(params).exec()
    }

    public findByUsername(username: string): Promise<UserDocument> {
        return this.UserModel.findOne({ username }).exec()
    }

    public findAll(): Promise<UserDocument[]> {
        return this.UserModel.find({}).exec()
    }

}