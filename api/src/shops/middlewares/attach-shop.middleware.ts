import { NestMiddleware } from "@nestjs/common";
import { of } from "rxjs";
import { NoResourceException } from "src/exceptions/no-resource.exception";
import { ShopService } from "../shop.service";

export class AttachShopMiddleware implements NestMiddleware {

    constructor(private readonly shopService: ShopService) { }

    async use(req: any, res: any, next: (error?: any) => void) {
        let shopId = req.params.id
        let shop = await this.shopService.findOne(shopId)
        if (!shop) next(new NoResourceException())
        req.shop = shop
        next()
    }
}