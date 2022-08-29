import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IShopRepository } from "./interfaces/shop-repository.interface";
import { ShopDocument } from "./shop.schema";

@Injectable()
export class ShopRepository implements IShopRepository {

    constructor(@InjectModel('Shop') private readonly ShopModel: Model<ShopDocument>) { }
    create() {
        throw new Error("Method not implemented.");
    }

}