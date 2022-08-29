import { Controller, Get } from '@nestjs/common';
import { ShopService } from './shop.service';

@Controller('shops')
export class ShopController {

    constructor(private readonly shopService: ShopService) { }

    @Get('/test')
    async getTest() {
        return 'This is test for shop controllers'
    }
}
