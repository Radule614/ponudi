import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/user.entity";
import { Repository } from "typeorm";

import * as bcrypt from "bcrypt"
import { RegisterDTO } from "./dtos/register.dto";
import { UserDTO } from "src/users/dtos/user.dto";
import { UserService } from "src/users/user.service";




@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService
    ) { }


    async register(user: RegisterDTO) {
        let hashedPassword: string = await bcrypt.hash(user.password, 10)

        let createdUser = await this.userService.create({
            ...user,
            password: hashedPassword
        })
        createdUser.password = undefined
        return createdUser
    }
}