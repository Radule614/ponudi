import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";



@Injectable()
export class ProductMatchesUser implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        return true
        let req: any = context.switchToHttp()
        let { user, product } = req

        if (user.id == product.owner) return true
        return false

    }
}