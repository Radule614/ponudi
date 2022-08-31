import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User, UserDocument } from "src/users/user.schema";
import { UserService } from "src/users/user.service";
import { IEmailProvider } from "./interfaces/email-service.interface";
import { IVerificationTokenPayload } from "./interfaces/verification-token-payload.interface";



@Injectable()
export class EmailService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        @Inject('IEmailProvider') private readonly emailServiceProvider: IEmailProvider
    ) { }

    async sendVerificationEmail(email: string) {
        let payload: IVerificationTokenPayload = { email }
        let token = this.jwtService.sign(payload)
        await this.emailServiceProvider.sendVerificationMail(email, token)
    }

    async verifyEmail(token: string) {
        try {
            let payload: IVerificationTokenPayload = await this.jwtService.verify(token)
            let user: any = await this.userService.find({ email: payload.email })
            if (!user) throw new BadRequestException('Verification link not correct!')
            if (user.isEmailVerified) throw new BadRequestException('Account already verified email!')
            user.isEmailVerified = true
            await this.userService.updateOne(user.id, user)
        } catch (err) {
            if (err?.name == 'TokenExpiredError') {
                throw new BadRequestException('Verification link expired!')
            }
            throw new BadRequestException(err.message)
        }
    }

}