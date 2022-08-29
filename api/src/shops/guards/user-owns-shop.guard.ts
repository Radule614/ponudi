import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";


export class UserOwnsShop implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        let request = context.switchToHttp().getRequest()

        let { user, shop } = request

        if (!user || !shop || user.id != shop.owner) return false
        return true
    }

}