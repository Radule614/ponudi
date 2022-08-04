import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IFilterRepository } from "./interfaces/filter-repository.interface";
import { FilterDocument } from "./filter.schema";
import { CreateFilterDTO } from "./dtos/create-filter.dto";
import mongoose from "mongoose";


@Injectable()
export class FilterRepository implements IFilterRepository {
    constructor(@InjectModel('Filter') private readonly FilterModel: Model<FilterDocument>) { }

    create(filter: CreateFilterDTO): Promise<FilterDocument> {
        let newFilter = new this.FilterModel(filter)
        return newFilter.save()
    }
    findAllByCategory(categoryId: string): Promise<FilterDocument[]> {
        // return this.FilterModel.find({
        //     categories: categoryId
        // }).exec()


        return this.FilterModel.aggregate([
            {
                $match: {
                    categories: { $in: [new mongoose.Types.ObjectId(categoryId)] }
                }
            },
            {
                $group: {
                    _id: "$group",
                    filters: { $push: { field: "$field", type: "$type", _id: "$_id" } }
                }
            }
        ]).exec()
    }

}