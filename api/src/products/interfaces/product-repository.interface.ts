import { CreateProductDTO } from "../dtos/create-product.dto";
import { ProductDocument } from "../product.schema";

export interface IProductRepository {
    create(product: CreateProductDTO): Promise<ProductDocument>
    findAll(): Promise<ProductDocument[]>
    delete(id: string)
}