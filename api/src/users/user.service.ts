import { HttpException, Inject, Injectable } from "@nestjs/common";
import { RegisterDTO } from "src/auth/dtos/register.dto";
import { UserRole } from "./enums/user-role.enum";
import { IUserRepository } from "./interfaces/user-repository.interface";
import { User, UserDocument } from "./user.schema";
import { UserRepository } from "./user.repository";
import { NoResourceException } from "src/exceptions/no-resource.exception";


@Injectable()
export class UserService {

    constructor(
        @Inject('IUserRepository') private readonly userRepository: IUserRepository
    ) { }

    async findAll(): Promise<User[]> {
        return await this.userRepository.findAll();
    }

    async create(user: RegisterDTO): Promise<any> {
        let newUser = {
            ...user,
            roles: [UserRole.USER]
        }
        return await this.userRepository.create(newUser);
    }

    async find(params: Object): Promise<User> {
        return await this.userRepository.findBy(params)
    }

    async findByUsername(username: string): Promise<User> {
        return await this.userRepository.findByUsername(username)
    }

    async updateOne(id: string, newUser: User): Promise<UserDocument> {
        return await this.userRepository.updateOne(id, newUser)
    }

    async findByVerificationId(verificationId: string): Promise<UserDocument> {
        return await this.userRepository.findBy({ verificationId })
    }


}