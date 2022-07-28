import { Inject, Injectable, Req } from "@nestjs/common";
import { Request } from "express";
import { Category, CategoryDocument } from "src/categories/category.schema";
import { CategoryService } from "src/categories/category.service";
import { FeatureBuilder } from "src/utils/feature-builder";
import { CreateProductDTO } from "./dtos/create-product.dto";
import { UpdateProductDTO } from "./dtos/update-product.dto";
import { IProductRepository } from "./interfaces/product-repository.interface";


@Injectable()
export class ProductService {

    constructor(
        @Inject('IProductRepository') private productRepository: IProductRepository,
        private readonly categoryService: CategoryService
    ) { }


    public async create(product: CreateProductDTO) {
        let category: Category = await this.categoryService.findById(product.category)
        product.additionalFields = this.mapAdditionalFields(category.additionalFields, product.additionalFields)
        let newProduct = await this.productRepository.create(product)
        return newProduct
    }

    public async findAllByCategory(categoryId: string, queryParams: any) {
        let categories: string[] = await this.categoryService.findAllSubcategories(categoryId)
        categories.push(categoryId)

        let query = this.productRepository.findAllByCategories(categories)
        let featureBuilder: FeatureBuilder = new FeatureBuilder(query, queryParams)
        let result = await featureBuilder
            .paginate()
            .filter()
            .executeQuery()
        let count: number = await this.productRepository.countAllByCategories(categories)

        return {
            data: result,
            count: result.length,
            pages: featureBuilder.calculatePages(count)
        }
    }

    public async findOne(id: string) {
        return await this.productRepository.findOne(id)
    }

    public async deleteOne(id: string) {
        return await this.productRepository.delete(id)
    }

    public async updateOne(id: string, newProduct: UpdateProductDTO) {
        return await this.productRepository.updateOne(id, newProduct)
    }

    private mapAdditionalFields(allowedFields: Array<string>, additionalFields: Object) {
        let allowedObject = {}

        allowedFields.forEach(field => {
            allowedObject[field] = additionalFields[field]
        })
        return allowedObject
    }

}