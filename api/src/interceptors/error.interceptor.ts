import { CallHandler, ExecutionContext, HttpException, Injectable, NestInterceptor } from "@nestjs/common";
import { catchError, Observable } from "rxjs";
import { MongoException } from "src/exceptions/mongo.exception";



@Injectable()
export class MongoErrorInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next
            .handle()
            .pipe(
                catchError(error => {
                    if (error instanceof HttpException) throw error
                    throw new MongoException(error.message, error.code)
                })
            )
    }

}