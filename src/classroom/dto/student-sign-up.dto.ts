import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class StudentSignUpDto {
    @IsNotEmpty()
    @ApiProperty()
    code: string
    @IsNotEmpty()
    @ApiProperty()
    name: string
    @IsNotEmpty()
    @ApiProperty()
    email: string
    @IsNotEmpty()
    @ApiProperty()
    school_id: string
    @IsNotEmpty()
    @ApiProperty()
    password: string
}
