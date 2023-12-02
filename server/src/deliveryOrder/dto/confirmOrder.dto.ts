import { IsMongoId, IsNotEmpty } from "class-validator";

export class ConfirmOrderDto {
    @IsMongoId()
    @IsNotEmpty()
    id: string;
}