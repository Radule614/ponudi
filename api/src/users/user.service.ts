import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { RegisterDTO } from "src/auth/dtos/register.dto";


@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    async getAll(): Promise<User[]> {
        return this.userRepository.find({});
    }

    async create(user: RegisterDTO): Promise<any> {
        let newUser = {
            ...user,
            role: ["user"]
        }
        return this.userRepository.save(newUser);
    }

}