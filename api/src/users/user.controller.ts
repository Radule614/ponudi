import { Body, Controller, Get, Post } from "@nestjs/common";
import { User } from "./user.entity";
import { UserDTO } from "./user.dto";
import { UserService } from "./user.service";
import { IUser } from "./user.interface";

@Controller('users')
export class UserController {

    constructor(
        private readonly userService: UserService
    ) { }

    @Get('/')
    async getAll(): Promise<UserDTO[]> {
        return this.userService.getAll()
    }

    @Post('/')
    async create(@Body() user: IUser) {
        this.userService.create(user)
    }


}