import { CreateProductDTO } from "../dtos/create-product.dto";
import { UpdateProductDTO } from "../dtos/update-product.dto";
import { Product, ProductDocument } from "../product.schema";

export interface IProductRepository {
    create(product: CreateProductDTO): Promise<ProductDocument>
    findAll(): Promise<ProductDocument[]>
    findOne(id: string): Promise<ProductDocument>
    delete(id: string): Promise<void>
    updateOne(id: string, newProduct: UpdateProductDTO): Promise<ProductDocument>
    findAllByCategory(categoryId: string): any
    findAllByCategories(categories: string[]): any
    countAll(): Promise<number>
    countAllByCategories(categories: string[]): Promise<number>
    findAllByUser(userId: string)
    addPictures(id: string, urls: string[]): Promise<void>
    removePictures(id: string, urls: string[]): Promise<void>
}