import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { IUser } from "./user.interface";


@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    async getAll(): Promise<User[]> {
        return this.userRepository.find({});
    }

    async create(user: IUser): Promise<any> {
        return this.userRepository.save(user);
    }

}