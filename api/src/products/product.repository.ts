import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateProductDTO } from "./dtos/create-product.dto";
import { IProductRepository } from "./interfaces/product-repository.interface";
import { Product, ProductDocument } from "./product.schema";



@Injectable()
export class ProductRepository implements IProductRepository {
    constructor(@InjectModel('Product') private readonly ProductModel: Model<ProductDocument>) { }

    create(product: CreateProductDTO): Promise<ProductDocument> {
        const newProduct = new this.ProductModel(product)
        return newProduct.save()
    }
    findAll(): Promise<ProductDocument[]> {
        return this.ProductModel.find().exec()
    }
    delete(id: string) {
        this.ProductModel.findByIdAndDelete(id)
    }

}