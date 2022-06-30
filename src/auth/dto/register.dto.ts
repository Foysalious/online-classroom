import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty } from "class-validator"

export class RegisterDto {
    
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    email:string
    @IsNotEmpty()
    @ApiProperty()
    password:string
    @ApiProperty()
    @IsNotEmpty()
    role:string
}
