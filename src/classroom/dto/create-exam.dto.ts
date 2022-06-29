import { IsNotEmpty } from "class-validator";

export class CreateExamDto {
    @IsNotEmpty()
    type: string
    @IsNotEmpty()
    classroom_id: string;
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    question: string;
    @IsNotEmpty()
    mark: Number;
    @IsNotEmpty()
    deadLine: Date;
}
