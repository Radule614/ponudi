import { Body, Catch, Controller, Get, HttpCode, HttpStatus, Post, UseFilters, UseInterceptors } from "@nestjs/common";
import { MongoErrorFilter } from "src/errorFilters/mongo-error.filter";
import { ErrorInterceptor } from "src/interceptors/error.interceptor";
import { AuthService } from "./auth.service";
import { LoginDTO } from "./dtos/login.dto";
import { RegisterDTO } from "./dtos/register.dto";


@Controller('auth')
@UseInterceptors(ErrorInterceptor)
@UseFilters(MongoErrorFilter)
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) { }


    @Post('/register')
    async register(@Body() user: RegisterDTO) {
        return await this.authService.register(user)
    }

    @HttpCode(HttpStatus.OK)
    @Post('/login')
    async login(@Body() loginData: LoginDTO) {
        let resp = await this.authService.login(loginData)
        return resp
    }

}