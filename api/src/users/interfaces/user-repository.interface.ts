import { User, UserDocument } from "../user.schema"

export interface IUserRepository {
    create(user: Object): Promise<UserDocument>
    findById(id: string): Promise<UserDocument>
    findBy(params: Object): Promise<UserDocument>
    findByUsername(username: string): Promise<UserDocument>
    findAll(): Promise<UserDocument[]>
    updateOne(id: string, newUser: User): Promise<UserDocument>
}