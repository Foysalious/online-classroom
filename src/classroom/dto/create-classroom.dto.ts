import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateClassroomDto {
    @IsNotEmpty()
    @ApiProperty()
    classroom_name:string
}
