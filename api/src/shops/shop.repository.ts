import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateShopDTO } from "./dtos/create-shop.dto";
import { UpdateShopDTO } from "./dtos/update-shop.dto";
import { IShopRepository } from "./interfaces/shop-repository.interface";
import { Shop, ShopDocument } from "./shop.schema";

@Injectable()
export class ShopRepository implements IShopRepository {

    constructor(@InjectModel('Shop') private readonly ShopModel: Model<ShopDocument>) { }

    async create(shop: CreateShopDTO): Promise<ShopDocument> {
        let newShop = new this.ShopModel(shop)
        return newShop.save()
    }

    async findOne(id: string): Promise<ShopDocument> {
        return await this.ShopModel.findOne({ _id: id }).exec()
    }

    async findAll(): Promise<ShopDocument[]> {
        return await this.ShopModel.find({}).exec()
    }

    async updateOne(id: string, newProduct: UpdateShopDTO): Promise<ShopDocument> {
        return await this.ShopModel.findOneAndUpdate({ _id: id }, newProduct, { new: true }).exec()
    }

    async deleteOne(id: string): Promise<void> {
        await this.ShopModel.findOneAndDelete({ _id: id })
    }


}