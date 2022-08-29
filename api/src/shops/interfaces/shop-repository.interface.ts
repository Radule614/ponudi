import { CreateShopDTO } from "../dtos/create-shop.dto";
import { UpdateShopDTO } from "../dtos/update-shop.dto";
import { Shop, ShopDocument } from "../shop.schema";

export interface IShopRepository {
    create(shop: CreateShopDTO): Promise<ShopDocument>
    findOne(id: string): Promise<ShopDocument>
    findAll(): Promise<ShopDocument[]>
    updateOne(id: string, newProduct: UpdateShopDTO): Promise<ShopDocument>
    deleteOne(id: string): Promise<void>
}