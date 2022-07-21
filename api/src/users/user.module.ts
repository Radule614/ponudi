import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { UserController } from "./user.controller";
import { User } from "./user.entity";
import { UserService } from "./user.service";


@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UsersModule { }