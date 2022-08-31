import { Injectable } from "@nestjs/common";
import { IEmailMessage } from "./interfaces/email-message.interface";
import { IEmailProvider } from "./interfaces/email-service.interface";
import * as sgApi from "@sendgrid/mail"
import { ConfigService } from "@nestjs/config";

@Injectable()
export class SendgridMailService implements IEmailProvider {
    constructor(private readonly configService: ConfigService) {
        const key = this.configService.get('SENDGRID_API_KEY')
        sgApi.setApiKey(key)
    }

    async sendVerificationMail(email: string, token: string): Promise<void> {
        let url = this.configService.get('EMAIL_VERIFICATION_TOKEN_URL')
        const message: IEmailMessage = {
            from: "ponudicom@gmail.com",
            to: email,
            subject: "Verification Mail For Ponudi!",
            text: "Thank you for registering your account on ponudi!",
            html:
                `
                To verify your email adress, click on the link below!
            <a href='${url}email/verify?token=${token}'>Verify email here</a>
            <a href='${url}email/resend?email=${email}'>Resend email here</a>
            `
        }
        await sgApi.send(message)
    }



}