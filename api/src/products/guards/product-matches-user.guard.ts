import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";



@Injectable()
export class ProductMatchesUser implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        console.log("triggered product guard")
        let req: any = context.switchToHttp().getRequest()
        let { user, product } = req
        console.log(user)
        if (user.id == product.owner) return true
        return false

    }
}