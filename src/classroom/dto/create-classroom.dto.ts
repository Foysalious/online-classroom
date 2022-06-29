import { IsNotEmpty } from "class-validator";

export class CreateClassroomDto {
    @IsNotEmpty()
    classroom_name:string
}
