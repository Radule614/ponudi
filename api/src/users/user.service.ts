import { Inject, Injectable } from "@nestjs/common";
import { RegisterDTO } from "src/auth/dtos/register.dto";
import { UserRole } from "./enums/user-role.enum";
import { IUserRepository } from "./interfaces/user-repository.interface";
import { User, UserDocument } from "./user.schema";
import { UserRepository } from "./user.repository";


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
}