import { BadRequestException, Inject, Injectable, Req } from "@nestjs/common";
import { Request } from "express";
import { Category, CategoryDocument } from "src/categories/category.schema";
import { CategoryService } from "src/categories/category.service";
import { IAdditionalField } from "src/categories/interfaces/additional-field.interface";
import { FeatureBuilder } from "src/utils/feature-builder";
import { IFeatureBuilder } from "src/utils/feature-builder.interface";
import { CreateProductDTO } from "./dtos/create-product.dto";
import { UpdateProductDTO } from "./dtos/update-product.dto";
import { IProductRepository } from "./interfaces/product-repository.interface";
import { Product, ProductDocument } from "./product.schema";


@Injectable()
export class ProductService {

    constructor(
        @Inject('IProductRepository') private productRepository: IProductRepository,
        private readonly categoryService: CategoryService
    ) { }

    public async create(product: CreateProductDTO): Promise<any> {
        let additionalFields = await this.categoryService.findCategoryAdditionalFields(product.category)
        product.additionalFields = this.mapAdditionalFields(additionalFields, product.additionalFields)
        let newProduct: any = await this.productRepository.create(product)
        return newProduct.toObject()
    }

    public async findAllByCategory(categoryId: string, queryParams: any) {
        let additionalFields: Array<IAdditionalField> = await this.categoryService.findCategoryAdditionalFields(categoryId)
        let categories: string[] = await this.categoryService.findAllSubcategories(categoryId)
        categories.push(categoryId)

        let query = this.productRepository.findAllByCategories(categories)
        let featureBuilder: IFeatureBuilder = new FeatureBuilder(query, queryParams, additionalFields)
        return await featureBuilder.generateResponseFromOperations()
    }

    public async findProductsByUser(userId: string, queryParams: any) {
        let query = this.productRepository.findAllByUser(userId)
        let featureBuilder: IFeatureBuilder = new FeatureBuilder(query, queryParams)
        return await featureBuilder.generateResponseFromOperations()
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

    private mapAdditionalFields(allowedFields: Array<IAdditionalField>, additionalFields: Object) {
        let allowedObject = {}
        if (!additionalFields) return allowedObject

        allowedFields.forEach(additional => {
            allowedObject[additional.field] = additionalFields[additional.field]
        })
        return allowedObject
    }

    public async addPictures(id: string, urls: string[]) {
        await this.productRepository.addPictures(id, urls)
    }

    public async removePictures(id: string, urls: string[]) {
        await this.productRepository.removePictures(id, urls)
    }

}