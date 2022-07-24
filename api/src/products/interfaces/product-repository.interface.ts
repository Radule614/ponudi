import { CreateProductDTO } from "../dtos/create-product.dto";
import { UpdateProductDTO } from "../dtos/update-product.dto";
import { Product, ProductDocument } from "../product.schema";

export interface IProductRepository {
    create(product: CreateProductDTO): Promise<ProductDocument>
    findAll(): Promise<ProductDocument[]>
    findOne(id: string): Promise<ProductDocument>
    delete(id: string)
    updateOne(id: string, newProduct: UpdateProductDTO): Promise<ProductDocument>
    findAllByCategory(categoryId: string): Promise<ProductDocument[]>
}