import { Inject, Injectable } from "@nestjs/common";
import { CreateProductDTO } from "./dtos/create-product.dto";
import { UpdateProductDTO } from "./dtos/update-product.dto";
import { IProductRepository } from "./interfaces/product-repository.interface";



@Injectable()
export class ProductService {

    constructor(
        @Inject('IProductRepository') private productRepository: IProductRepository
    ) { }


    async create(product: CreateProductDTO) {
        let newProduct = await this.productRepository.create(product)
        return newProduct
    }

    async findAllByCategory(categoryId: string) {
        return await this.productRepository.findAllByCategory(categoryId)
    }

    async findOne(id: string) {
        return await this.productRepository.findOne(id)
    }

    async deleteOne(id: string) {
        return await this.productRepository.delete(id)
    }

    async updateOne(id: string, newProduct: UpdateProductDTO) {
        return await this.productRepository.updateOne(id, newProduct)
    }
}