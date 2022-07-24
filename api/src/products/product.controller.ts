import { Body, Controller, Delete, ForbiddenException, Get, HttpCode, HttpException, HttpStatus, Param, Patch, Post, Req, UseFilters, UseGuards, UseInterceptors } from "@nestjs/common";
import { RolesGuard } from "src/auth/guards/role.guard";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Roles } from "src/auth/role.decorator";
import { MongoErrorFilter } from "src/errorFilters/mongo-error.filter";
import { ErrorInterceptor } from "src/interceptors/error.interceptor";
import { UserRole } from "src/users/enums/user-role.enum";
import { ReqWithUser } from "src/users/interfaces/request-with-user.interface";
import { CreateProductDTO } from "./dtos/create-product.dto";
import { UpdateProductDTO } from "./dtos/update-product.dto";
import { Product } from "./product.schema";
import { ProductService } from "./product.service";




@Controller('products')
@UseInterceptors(ErrorInterceptor)
@UseFilters(MongoErrorFilter)
export class ProductController {

    constructor(private readonly productService: ProductService) { }

    @Post('/')
    @Roles(UserRole.USER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async create(@Body() product: CreateProductDTO) {
        return await this.productService.create(product)
    }

    @Get('/category/:id')
    async getProductsByCategory(@Param('id') categoryId: string) {
        return await this.productService.findAllByCategory(categoryId)
    }

    @Get('/:id')
    async getProduct(@Param('id') id: string) {
        return await this.productService.findOne(id)
    }

    @Patch("/:id")
    @Roles(UserRole.USER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async updateProduct(@Param('id') id: string, @Body() newProduct: UpdateProductDTO, @Req() request: ReqWithUser) {
        let product: any = await this.productService.findOne(id)
        let userObj: any = request.user
        if (product.owner.toString() !== userObj._id.toString()) throw new ForbiddenException()
        return await this.productService.updateOne(id, newProduct)
    }

    @Delete("/:id")
    @HttpCode(HttpStatus.NO_CONTENT)
    @Roles(UserRole.USER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async deleteProduct(@Param('id') id: string, @Req() request: ReqWithUser) {
        let userObj: any = request.user
        let product: any = await this.productService.findOne(id)
        if (product.owner.toString() != userObj._id.toString()) throw new ForbiddenException()
        return await this.productService.deleteOne(id)
    }
}