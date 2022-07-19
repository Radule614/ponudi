import { Body, Catch, Controller, Get, Post, UseFilters, UseInterceptors } from "@nestjs/common";
import { MongoErrorFilter } from "src/errorFilters/mongo-error.filter";
import { MongoErrorInterceptor } from "src/interceptors/error.interceptor";
import { AuthService } from "./auth.service";
import { RegisterDTO } from "./dtos/register.dto";


@Controller('auth')
@UseInterceptors(MongoErrorInterceptor)
@UseFilters(MongoErrorFilter)
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) { }


    @Post('/register')
    async register(@Body() user: RegisterDTO) {
        return await this.authService.register(user)
    }

}