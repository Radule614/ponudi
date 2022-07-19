import { IsEmail, IsNotEmpty, MinLength } from "class-validator"


export class RegisterDTO {
    @IsNotEmpty()
    public username: string

    @IsNotEmpty()
    public name: string

    @IsNotEmpty()
    public surname: string

    @IsNotEmpty()
    @MinLength(8)
    public password: string

    @IsNotEmpty()
    @IsEmail()
    public email: string

    public description: string
}