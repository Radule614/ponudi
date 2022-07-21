import { IsEmail, IsNotEmpty, IsOptional, MinLength, ValidateIf } from "class-validator"


export class LoginDTO {
    @ValidateIf(o => o.username === undefined || o.username)
    @IsOptional()
    public username: string

    @IsNotEmpty()
    public password: string

    @ValidateIf(o => o.username === undefined || o.email)
    @IsOptional()
    public email: string

}