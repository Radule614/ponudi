import { HttpException } from "@nestjs/common";



export class ForbidenException extends HttpException {
    constructor() {
        super("Resource forbidden!", 403)
    }
}