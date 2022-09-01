import { Exclude } from "class-transformer";
import { IsEmpty, IsNotEmpty, IsObject, IsOptional } from "class-validator";
import { ILocation } from "../interfaces/location.interface";


export class UpdateShopDTO {

    @IsOptional()
    @IsNotEmpty()
    name?: string

    @IsOptional()
    @IsNotEmpty()
    @IsObject()
    location?: ILocation

    @IsOptional()
    @IsNotEmpty()
    adress?: string

    @IsOptional()
    @IsNotEmpty()
    telephoneNumber?: string

    @IsOptional()
    @IsNotEmpty()
    serviceType: string

    @Exclude()
    owner: string

}