import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FilterController } from "./filter.controller";
import { FilterRepository } from "./filter.repository";
import { FilterSchema } from "./filter.schema";
import { FilterService } from "./filter.service";



@Module({
    imports: [
        MongooseModule.forFeature([{ schema: FilterSchema, name: "Filter" }])
    ],
    controllers: [FilterController],
    providers: [FilterService, {
        provide: "IFilterRepository",
        useClass: FilterRepository
    }],
    exports: [FilterService]
})
export class FiltersModule { }