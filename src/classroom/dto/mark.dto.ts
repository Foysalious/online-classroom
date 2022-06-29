import { IsNotEmpty } from "class-validator"

export class MarkDto {
    @IsNotEmpty()
    mark:Number
    @IsNotEmpty()
    student_id: string
    @IsNotEmpty()
    post_id:string
}
