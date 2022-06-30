import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateExamDto {
    @IsNotEmpty()
    @ApiProperty()
    type: string
    @IsNotEmpty()
    @ApiProperty()
    classroom_id: string;
    @IsNotEmpty()
    @ApiProperty()
    name: string;
    @IsNotEmpty()
    @ApiProperty()
    question: string;
    @IsNotEmpty()
    @ApiProperty()
    mark: Number;
    @IsNotEmpty()
    @ApiProperty()
    deadLine: Date;
}
