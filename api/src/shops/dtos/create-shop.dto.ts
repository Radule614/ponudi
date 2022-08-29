import { IsNotEmpty, IsObject } from "class-validator";
import { ILocation } from "../interfaces/location.interface";


export class CreateShopDTO {

    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    @IsObject()
    location: ILocation

    @IsNotEmpty()
    adress: string

    @IsNotEmpty()
    telephoneNumber: string

    @IsNotEmpty()
    serviceType: string

    owner?: string
}