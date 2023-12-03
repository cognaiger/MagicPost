import { IsEnum, IsMongoId, IsNotEmpty } from "class-validator";
import { CONFIRMORDER } from "src/common/const";

export class ConfirmOrderDto {
    @IsMongoId()
    @IsNotEmpty()
    id: string;

    @IsEnum(CONFIRMORDER)
    @IsNotEmpty()
    type: string;
}