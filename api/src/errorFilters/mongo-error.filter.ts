import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Response } from "express";
import { MongoException } from "src/exceptions/mongo.exception";
import { MongoError } from "typeorm";

interface IResp {
    message: string,
    status: number
}


@Catch(MongoException)
export class MongoErrorFilter implements ExceptionFilter {
    catch(exception: MongoException, host: ArgumentsHost): void {
        const message: string = exception.message
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        console.log(message)
        let resp: IResp = this.determineResponseByCode(exception.code)

        response
            .status(400)
            .json(resp);
    }


    determineResponseByCode(code: number): IResp {
        switch (code) {
            case 11000: return {
                message: "Entity already exists!",
                status: 400
            }

            default: return {
                message: "Bad request!",
                status: 400
            }
        }



    }
}