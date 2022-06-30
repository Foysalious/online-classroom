import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"
export class UploadPostDto {
    @IsNotEmpty()
    @ApiProperty()
    post_id: string
}
