import { IsNotEmpty } from "class-validator"
export class UploadPostDto {
    @IsNotEmpty()
    post_id: string
}
