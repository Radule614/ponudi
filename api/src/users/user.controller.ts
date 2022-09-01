import { Body, Controller, Get, HttpException, Inject, Param, Post, Put, Req, UploadedFile, UseFilters, UseGuards, UseInterceptors } from "@nestjs/common";
import { UserService } from "./user.service";
import { ErrorInterceptor } from "src/interceptors/error.interceptor";
import { MongoErrorFilter } from "src/errorFilters/mongo-error.filter";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { Roles } from "src/auth/role.decorator";
import { UserRole } from "./enums/user-role.enum";
import { RolesGuard } from "src/auth/guards/role.guard";
import { ReqWithUser } from "./interfaces/request-with-user.interface";
import { FileInterceptor } from "@nestjs/platform-express";
import { IStorageService } from "src/storage/interfaces/storage-service.interface";
import { storage } from "firebase-admin";

@Controller('users')
@UseInterceptors(ErrorInterceptor)
@UseFilters(MongoErrorFilter)
export class UserController {

    constructor(
        private readonly userService: UserService,
        @Inject('IStorageService') private readonly storageService: IStorageService
    ) { }

    @Get('/')
    @Roles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async findAllUsers() {
        return await this.userService.findAll()
    }

    @Get('/me')
    @Roles(UserRole.ADMIN, UserRole.USER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async findOne(@Req() request: ReqWithUser) {
        let { user } = request
        user.password = undefined
        return user
    }

    @Put('/me/picture')
    @Roles(UserRole.ADMIN, UserRole.USER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UseInterceptors(FileInterceptor('file'))
    async updateProfilePicture(@UploadedFile() file: Express.Multer.File, @Req() request: ReqWithUser) {
        let user: any = request.user
        let url = await this.storageService.uploadFile('profile-imgs/' + request.user.username + "/", file)
        user.profileUrl = url
        let newUser = await this.userService.updateOne(user.id, user)
        return newUser
    }


}