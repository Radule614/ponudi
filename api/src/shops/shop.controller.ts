import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Req, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/role.decorator';
import { MongoErrorFilter } from 'src/errorFilters/mongo-error.filter';
import { ErrorInterceptor } from 'src/interceptors/error.interceptor';
import { UserRole } from 'src/users/enums/user-role.enum';
import { CreateShopDTO } from './dtos/create-shop.dto';
import { UpdateShopDTO } from './dtos/update-shop.dto';
import { UserOwnsShop } from './guards/user-owns-shop.guard';
import { ReqWithShop } from './interfaces/req-with-shop.interface';
import { ShopService } from './shop.service';

@Controller('shops')
@UseInterceptors(ErrorInterceptor)
@UseFilters(MongoErrorFilter)
export class ShopController {

    constructor(private readonly shopService: ShopService) { }

    @Post('/')
    @Roles(UserRole.USER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async create(@Body() shop: CreateShopDTO, @Req() request: any) {
        shop.owner = request.user.id
        return await this.shopService.create(shop)
    }

    @Get('/:id')
    async findOne(@Req() request: ReqWithShop) {
        return request.shop
    }

    @Get('/')
    async findAll() {
        return await this.shopService.findAll()
    }

    @Patch('/:id')
    @Roles(UserRole.USER)
    @UseGuards(JwtAuthGuard, RolesGuard, UserOwnsShop)
    async updateOne(@Param('id') id: string, @Body() newShop: UpdateShopDTO) {
        return await this.shopService.updateOne(id, newShop)
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @Roles(UserRole.USER)
    @UseGuards(JwtAuthGuard, RolesGuard, UserOwnsShop)
    async deleteOne(@Param('id') id: string) {
        await this.shopService.deleteOne(id)
    }
}
