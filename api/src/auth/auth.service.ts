import { HttpException, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/user.schema";
import { Repository } from "typeorm";

import * as bcrypt from "bcrypt"
import { RegisterDTO } from "./dtos/register.dto";
import { UserDTO } from "src/users/dtos/user.dto";
import { UserService } from "src/users/user.service";
import { JwtService } from "@nestjs/jwt";
import { LoginDTO } from "./dtos/login.dto";
import { CredentialsWrongException } from "src/exceptions/credentials-wrong.exception";
import { ITokenPayload } from "./interfaces/token-payload.interface";




@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
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

    async login({ username, password, email }: LoginDTO) {

        let user: User = await this.userService.find({
            '$or': [{ username }, { email }]
        })
        if (!user) throw new CredentialsWrongException()
        await this.verifyPassword(password, user.password)

        let payload: ITokenPayload = { username: user.username }
        return this.signToken(payload)
    }

    async verifyPassword(plainTextPassword: string, hashedPassword) {
        let passwordsMatching = await bcrypt.compare(plainTextPassword, hashedPassword)
        if (!passwordsMatching) throw new CredentialsWrongException()
    }

    async signToken(payload: ITokenPayload) {
        return {
            token: this.jwtService.sign(payload)
        }
    }


}