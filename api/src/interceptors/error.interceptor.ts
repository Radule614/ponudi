import { CallHandler, ExecutionContext, HttpException, Injectable, NestInterceptor } from "@nestjs/common";
import { MongooseError } from "mongoose";
import { catchError, Observable } from "rxjs";
import { MongoException } from "src/exceptions/mongo.exception";



@Injectable()
export class ErrorInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next
            .handle()
            .pipe(
                catchError(error => {
                    console.log(error)
                    if (error instanceof HttpException) throw error
                    throw new MongoException(error.message, error.code)
                })
            )
    }

}