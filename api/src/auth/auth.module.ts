import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { User, UserSchema } from "src/users/user.schema";
import { UsersModule } from "src/users/user.module";
import { UserService } from "src/users/user.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { MongooseModule } from "@nestjs/mongoose"

const jwtFactory = {
    useFactory: async () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
            expiresIn: process.env.JWT_EXPIRES
        }
    })
}


@Module({
    imports: [
        UsersModule,
        JwtModule.registerAsync(jwtFactory)
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy]
})
export class AuthModule { }