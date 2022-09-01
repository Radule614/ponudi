import { Injectable, NestMiddleware, UnprocessableEntityException } from "@nestjs/common";
import { NoResourceException } from "src/exceptions/no-resource.exception";
import { ProductService } from "../product.service";

@Injectable()
export class AttachProductMiddleware implements NestMiddleware {

    constructor(private readonly productService: ProductService) { }

    async use(req: any, res: any, next: (error?: any) => void) {
        console.log(req.params)
        let productId = req.params.id
        let product = await this.productService.findOne(productId)
        if (!product) next(new NoResourceException())
        req.product = product
        next()
    }

}