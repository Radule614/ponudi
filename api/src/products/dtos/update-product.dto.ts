import { IsNumber, Validate, ValidateIf } from "class-validator"

export class UpdateProductDTO {
    public content?: string

    @ValidateIf(o => o.price != null)
    @IsNumber()
    public price?: number

    public owner?: string

    public category?: string

    public description?: string

    public pictures?: Array<string>

    public currency?: string
}