import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class MarkDto {
    @IsNotEmpty()
    @ApiProperty()
    mark:Number
    @IsNotEmpty()
    @ApiProperty()
    student_id: string
    @IsNotEmpty()
    @ApiProperty()
    post_id:string
}
