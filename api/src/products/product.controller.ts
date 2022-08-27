import { Body, ClassSerializerInterceptor, Controller, Delete, FileTypeValidator, ForbiddenException, Get, HttpCode, HttpException, HttpStatus, Inject, Param, Patch, Post, Put, Query, Req, UploadedFiles, UseFilters, UseGuards, UseInterceptors, UsePipes } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { RolesGuard } from "src/auth/guards/role.guard";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { Roles } from "src/auth/role.decorator";
import { MongoErrorFilter } from "src/errorFilters/mongo-error.filter";
import { ErrorInterceptor } from "src/interceptors/error.interceptor";
import { UserRole } from "src/users/enums/user-role.enum";
import { ReqWithUser } from "src/users/interfaces/request-with-user.interface";
import { CreateProductDTO } from "./dtos/create-product.dto";
import { UpdateProductDTO } from "./dtos/update-product.dto";
import { ProductService } from "./product.service";
import { ProductMatchesUser } from "./guards/product-matches-user.guard";
import { ReqWithProduct } from "./interfaces/request-with-product";
import { IStorageService } from "src/storage/interfaces/storage-service.interface";
import { SanitizePipe } from "src/globalPipes/xss-sanitizer.pipe";
import { Product, ProductDocument } from "./product.schema";


@Controller('products')
@UseInterceptors(ErrorInterceptor)
@UseFilters(MongoErrorFilter)
export class ProductController {

    constructor(
        private readonly productService: ProductService,
        @Inject('IStorageService') private readonly storageService: IStorageService
    ) { }

    @Put('/:id')
    @Roles(UserRole.USER)
    @UseGuards(JwtAuthGuard, RolesGuard, ProductMatchesUser)
    @UseInterceptors(FilesInterceptor('files'))
    async uploadPicturesForProduct(
        @Param('id') id: string,
        @UploadedFiles() files: Array<Express.Multer.File>,
        @Req() request: ReqWithProduct
    ) {
        let product = request.product
        let urls = await this.storageService.uploadFiles('product-imgs/' + request.user.username + "/", files)
        product.pictures = urls
        this.productService.updateOne(id, product)
        return urls
    }

    @Post('/')
    @Roles(UserRole.USER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @UsePipes(new SanitizePipe(CreateProductDTO))
    async create(@Body() product: CreateProductDTO, @Req() request: ReqWithUser) {
        let user: any = request.user
        product.owner = user.id
        let createdProduct: Product = await this.productService.create(product)
        return createdProduct
    }

    @Get('/category/:id')
    async getProductsByCategory(@Param('id') categoryId: string, @Query() query) {
        return await this.productService.findAllByCategory(categoryId, query)
    }


    @Get('/:id')
    async getProduct(@Req() request: ReqWithProduct) {
        return request.product
    }

    @Patch("/:id")
    @Roles(UserRole.USER)
    @UseGuards(JwtAuthGuard, RolesGuard, ProductMatchesUser)
    async updateProduct(@Param('id') id: string, @Body() newProduct: UpdateProductDTO) {
        return await this.productService.updateOne(id, newProduct)
    }

    @Delete("/:id")
    @HttpCode(HttpStatus.NO_CONTENT)
    @Roles(UserRole.USER)
    @UseGuards(JwtAuthGuard, RolesGuard, ProductMatchesUser)
    async deleteProduct(@Param('id') id: string) {
        return await this.productService.deleteOne(id)
    }

    @Get('/user/:id')
    async getProductsByUser(@Param('id') userId: string, @Query() queryParams) {
        return await this.productService.findProductsByUser(userId, queryParams)
    }
}