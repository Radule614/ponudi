import { Body, Controller, Get, HttpException, Post, UseFilters, UseGuards, UseInterceptors } from "@nestjs/common";
import { UserService } from "./user.service";
import { ErrorInterceptor } from "src/interceptors/error.interceptor";
import { MongoErrorFilter } from "src/errorFilters/mongo-error.filter";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller('users')
@UseInterceptors(ErrorInterceptor)
@UseFilters(MongoErrorFilter)
export class UserController {

    constructor(
        private readonly userService: UserService
    ) { }

    @Get('/')
    @UseGuards(JwtAuthGuard)
    async getAllUsers() {
        return await this.userService.findAll()
    }

}