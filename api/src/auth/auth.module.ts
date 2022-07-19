import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/users/user.entity";
import { UsersModule } from "src/users/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";


@Module({
    imports: [UsersModule, TypeOrmModule.forFeature([User])],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {

}