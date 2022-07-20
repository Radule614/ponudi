import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { RegisterDTO } from "src/auth/dtos/register.dto";
import { UserRole } from "./enums/user-role.enum";


@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    async findAll(): Promise<User[]> {
        return this.userRepository.find({});
    }

    async create(user: RegisterDTO): Promise<any> {
        let newUser = {
            ...user,
            role: [UserRole.USER]
        }
        return this.userRepository.save(newUser);
    }

    async find(params: Object): Promise<User> {
        return this.userRepository.findOne(params)
    }

    async findByUsername(usernameObject: Object): Promise<User> {
        return this.userRepository.findOne(usernameObject)
    }

    async findProfileById(id: string) {
        let params: Object = { id }
        return this.userRepository.findOneBy(params)
    }

}