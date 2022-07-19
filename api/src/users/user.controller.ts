import { Body, Controller, Get, HttpException, Post, UseFilters, UseInterceptors } from "@nestjs/common";
import { UserService } from "./user.service";
import { MongoErrorInterceptor } from "src/interceptors/error.interceptor";
import { MongoErrorFilter } from "src/errorFilters/mongo-error.filter";

@Controller('users')
@UseInterceptors(MongoErrorInterceptor)
@UseFilters(MongoErrorFilter)
export class UserController {

    constructor(
        private readonly userService: UserService
    ) { }

    @Get('/')
    async getAllUsers() {
        return await this.userService.getAll()
    }

}