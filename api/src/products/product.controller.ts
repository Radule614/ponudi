import { Body, Controller, Delete, FileTypeValidator, ForbiddenException, Get, HttpCode, HttpException, HttpStatus, MaxFileSizeValidator, Param, ParseFilePipe, Patch, Post, Query, Req, UploadedFile, UploadedFiles, UseFilters, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
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
import { FirebaseStorageService } from "src/firebase/firebase,service";



@Controller('products')
@UseInterceptors(ErrorInterceptor)
@UseFilters(MongoErrorFilter)
export class ProductController {

    constructor(
        private readonly productService: ProductService,
        private readonly firebaseStorage: FirebaseStorageService
    ) { }

    @Post('/')
    @Roles(UserRole.USER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UseInterceptors(FileInterceptor('file'))
    async create(
        @Body() product: CreateProductDTO,
        @UploadedFile('file') file: Express.Multer.File,
        @Req() request: ReqWithUser
    ) {
        let { user } = request
        let prod: any = await this.productService.create(product)
        let url = await this.firebaseStorage.uploadFile('product-imgs/' + user.username + "/" + product.content, file.buffer)
        let newProduct = prod as CreateProductDTO
        newProduct.pictures = [url]
        await this.productService.updateOne(prod._id, newProduct)
        return prod
    }

    @Get('/category/:id')
    async getProductsByCategory(@Param('id') categoryId: string, @Query() query) {
        return await this.productService.findAllByCategory(categoryId, query)
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

    @Get('/user/:id')
    async getProductsByUser(@Param('id') userId: string, @Query() queryParams) {
        return await this.productService.findProductsByUser(userId, queryParams)
    }
}