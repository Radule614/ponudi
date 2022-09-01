import { Body, Controller, Get, HttpException, Inject, Param, Post, Query } from '@nestjs/common';
import { NoResourceException } from 'src/exceptions/no-resource.exception';
import { UserService } from 'src/users/user.service';
import { v4 } from "uuid"
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {

    constructor(private readonly emailService: EmailService) { }


    @Post('/verify')
    async verifyEmail(@Body('token') token: string) {
        await this.emailService.verifyEmail(token)
    }

    @Post('/resend')
    async resendVerification(@Body('email') email: string) {
        await this.emailService.sendVerificationEmail(email)
    }
}
