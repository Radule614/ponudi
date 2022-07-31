import { IsEmpty, IsNotEmpty } from "class-validator";

export class CreateFilterDTO {
    @IsNotEmpty()
    field: string
    @IsNotEmpty()
    type: string
    @IsNotEmpty()
    group: string
    @IsNotEmpty()
    categories: Array<string>
}