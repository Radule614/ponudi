import { HttpException, HttpStatus } from "@nestjs/common";




export class MongoException extends HttpException {
    constructor(message: string, public code: number) {
        super(message, HttpStatus.BAD_REQUEST)
    }
}