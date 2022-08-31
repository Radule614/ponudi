import { CanActivate, ExecutionContext, ForbiddenException, UseFilters } from "@nestjs/common";
import { Observable } from "rxjs";
import { ReqWithUser } from "src/users/interfaces/request-with-user.interface";




export class MailVerified implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        let request: ReqWithUser = context.switchToHttp().getRequest()
        if (request.user.isEmailVerified) return true
        throw new ForbiddenException('Email not verified!')
    }
}