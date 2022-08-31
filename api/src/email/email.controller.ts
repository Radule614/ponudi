import { Controller, Get, HttpException, Inject, Param, Query } from '@nestjs/common';
import { NoResourceException } from 'src/exceptions/no-resource.exception';
import { UserService } from 'src/users/user.service';
import { v4 } from "uuid"
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {

    constructor(private readonly emailService: EmailService) { }


    @Get('/verify')
    async verifyEmail(@Query('token') token: string) {
        await this.emailService.verifyEmail(token)
    }

    @Get('/resend')
    async resendVerification(@Query('email') email: string) {
        await this.emailService.sendVerificationEmail(email)
    }
}
