import { Controller, Get } from "@nestjs/common";




@Controller('products')
export class ProductController {

    @Get('/categories')
    async getProductCategories() {
        return [
            { name: 'vozila', path: 'category/vozila', icon: 'car' },
            { name: 'nekretnine', path: 'category/nekretnine', icon: 'building' },
            { name: 'računari', path: 'category/racunari', icon: 'computer' },
            { name: 'saksije', path: 'category/saksije', icon: 'box-archive' },
            { name: 'ostalo', path: 'category/ostalo', icon: 'box-open' }
        ]
    }
}