import { HttpCode, HttpException, HttpStatus } from "@nestjs/common";



export class CredentialsWrongException extends HttpException {
    constructor() {
        super("Credentials are wrong!", HttpStatus.BAD_REQUEST)
    }
}