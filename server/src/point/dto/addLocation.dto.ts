import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { PointType } from "src/common/const";

export class AddLocationDto {
    @IsString()
    @IsNotEmpty()
    name: String;

    @IsString()
    @IsNotEmpty()
    location: String;

    @IsEnum(PointType)
    @IsNotEmpty()
    type: String;
}