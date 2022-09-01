import { Body, Controller, Get, HttpException, Inject, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/role.decorator';
import { NoResourceException } from 'src/exceptions/no-resource.exception';
import { UserRole } from 'src/users/enums/user-role.enum';
import { ReqWithUser } from 'src/users/interfaces/request-with-user.interface';
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
    @Roles(UserRole.USER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async resendVerification(@Req() request: ReqWithUser) {
        await this.emailService.sendVerificationEmail(request.user.email)
    }
}
