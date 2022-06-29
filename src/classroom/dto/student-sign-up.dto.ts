import { IsNotEmpty } from "class-validator"

export class StudentSignUpDto {
    @IsNotEmpty()
    code: string
    @IsNotEmpty()
    name: string
    @IsNotEmpty()
    email: string
    @IsNotEmpty()
    school_id: string
    @IsNotEmpty()
    password: string
}
