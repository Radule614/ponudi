import { Body, Catch, Controller, Get, HttpCode, HttpStatus, Inject, Post, UseFilters, UseInterceptors } from "@nestjs/common";
import { EmailService } from "src/email/email.service";
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
        private readonly authService: AuthService,
        private readonly emailService: EmailService
    ) { }

    @Post('/register')
    async register(@Body() user: RegisterDTO) {
        let registeredUser = await this.authService.register(user)
        await this.emailService.sendVerificationEmail(registeredUser.email)
        return registeredUser
    }

    @HttpCode(HttpStatus.OK)
    @Post('/login')
    async login(@Body() loginData: LoginDTO) {
        return await this.authService.login(loginData)
    }

}