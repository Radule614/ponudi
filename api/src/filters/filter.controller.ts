import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { RolesGuard } from "src/auth/guards/role.guard";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Roles } from "src/auth/role.decorator";
import { UserRole } from "src/users/enums/user-role.enum";
import { CreateFilterDTO } from "./dtos/create-filter.dto";
import { FilterService } from "./filter.service";



@Controller('filters')
export class FilterController {

    constructor(private readonly filterService: FilterService) { }

    @Post('/')
    @Roles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async create(@Body() filter: CreateFilterDTO) {
        return await this.filterService.create(filter)
    }

    @Get('/category/:id')
    async getAllByCategory(@Param('id') categoryId: string) {
        return await this.filterService.findFiltersForCategory(categoryId)
    }
}