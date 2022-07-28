import { HttpException, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { NoResourceException } from "src/exceptions/no-resource.exception";
import { CreateProductDTO } from "./dtos/create-product.dto";
import { UpdateProductDTO } from "./dtos/update-product.dto";
import { IProductRepository } from "./interfaces/product-repository.interface";
import { Product, ProductDocument } from "./product.schema";



@Injectable()
export class ProductRepository implements IProductRepository {
    constructor(@InjectModel('Product') private readonly ProductModel: Model<ProductDocument>) { }

    findAllByUser(userId: string): Promise<ProductDocument[]> {
        return this.ProductModel.find({
            owner: userId
        }).exec()
    }

    public async countAllByCategories(categories: string[]): Promise<number> {
        return await this.ProductModel.count({
            category: { $in: categories }
        }).exec()
    }

    public create(product: CreateProductDTO): Promise<ProductDocument> {
        const newProduct = new this.ProductModel(product)
        return newProduct.save()
    }

    public findAll(): Promise<ProductDocument[]> {
        return this.ProductModel.find().exec()
    }

    public delete(id: string) {
        this.ProductModel.findByIdAndDelete(id).exec()
    }


    public findAllByCategory(categoryId: string): any {
        return this.ProductModel.find({
            category: categoryId
        }, "-__v")
    }

    public findAllByCategories(categories: string[]) {
        return this.ProductModel.find({
            category: { $in: categories }
        }, "-__v")
    }

    public findOne(id: string): Promise<ProductDocument> {
        return this.ProductModel
            .findById(id, "-__v")
            .orFail(new NoResourceException())
            .exec()
    }

    public updateOne(id: string, newProduct: UpdateProductDTO): Promise<ProductDocument> {
        return this.ProductModel.findOneAndUpdate({ _id: id }, { ...newProduct }, { new: true }).exec()
    }


    public async countAll(): Promise<number> {
        return await this.ProductModel.countDocuments()
    }

}