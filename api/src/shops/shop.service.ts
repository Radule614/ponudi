import { Inject, Injectable } from '@nestjs/common';
import { CreateShopDTO } from './dtos/create-shop.dto';
import { UpdateShopDTO } from './dtos/update-shop.dto';
import { IShopRepository } from './interfaces/shop-repository.interface';
import { Shop } from './shop.schema';

@Injectable()
export class ShopService {

    constructor(@Inject('IShopRepository') private readonly shopRepository: IShopRepository) { }

    async create(shop: CreateShopDTO) {
        return await this.shopRepository.create(shop)
    }

    async findOne(id: string) {
        return await this.shopRepository.findOne(id)
    }

    async findAll() {
        return await this.shopRepository.findAll()
    }

    async deleteOne(id: string) {
        await this.shopRepository.deleteOne(id)
    }

    async updateOne(id: string, newShop: UpdateShopDTO) {
        return await this.shopRepository.updateOne(id, newShop)
    }


}
