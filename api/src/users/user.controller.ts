import { Body, Controller, Get, HttpException, Param, Post, Req, UseFilters, UseGuards, UseInterceptors } from "@nestjs/common";
import { UserService } from "./user.service";
import { ErrorInterceptor } from "src/interceptors/error.interceptor";
import { MongoErrorFilter } from "src/errorFilters/mongo-error.filter";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Roles } from "src/auth/role.decorator";
import { UserRole } from "./enums/user-role.enum";
import { RolesGuard } from "src/auth/guards/role.guard";
import { ObjectID } from "typeorm";
import { ReqWithUser } from "./interfaces/request-with-user.interface";
import { AuthGuard } from "@nestjs/passport";

@Controller('users')
@UseInterceptors(ErrorInterceptor)
@UseFilters(MongoErrorFilter)
export class UserController {

    constructor(
        private readonly userService: UserService
    ) { }

    @Get('/')
    @Roles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async findAllUsers() {
        return await this.userService.findAll()
    }

    @Get('/me')
    @Roles(UserRole.ADMIN, UserRole.USER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async findOne(@Req() request: ReqWithUser) {
        let { user } = request
        user.password = undefined
        user.roles = undefined
        return user
    }


}