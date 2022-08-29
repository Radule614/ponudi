import { Inject, Injectable } from '@nestjs/common';
import { IShopRepository } from './interfaces/shop-repository.interface';

@Injectable()
export class ShopService {


    constructor(@Inject('IShopRepository') private readonly shopRepository: IShopRepository) { }

}
