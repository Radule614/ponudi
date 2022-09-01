
export interface IEmailProvider {
    sendVerificationMail(email: string, verificationId: string): Promise<void>
}