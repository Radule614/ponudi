import { HttpException } from "@nestjs/common";

export class NoResourceException extends HttpException {
    constructor() {
        super("Resource not found!", 404)
    }
}