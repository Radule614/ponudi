import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";



@Injectable()
export class ProductMatchesUser implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        let req: any = context.switchToHttp().getRequest()
        let { user, product } = req
        if (!user || !product || user.id != product.owner) return false
        return true
    }
}