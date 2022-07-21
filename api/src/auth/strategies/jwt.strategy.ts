import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt"
import { UserService } from "src/users/user.service";
import { ITokenPayload } from "../interfaces/token-payload.interface";



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly userService: UserService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
        })
    }

    async validate({ username }: ITokenPayload) {
        let result = await this.userService.findByUsername(username)
        return result
    }
}