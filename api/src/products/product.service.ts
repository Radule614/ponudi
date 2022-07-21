import { Inject, Injectable } from "@nestjs/common";
import { IProductRepository } from "./interfaces/product-repository.interface";



@Injectable()
export class ProductService {

    constructor(
        @Inject('IProductRepository') private productRepository: IProductRepository
    ) { }

}