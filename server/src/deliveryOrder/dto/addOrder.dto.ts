import { IsEnum, IsMongoId, IsNotEmpty, IsOptional } from "class-validator";
import { ORDERTYPE } from "src/common/const";

export class AddOrderDto {
    @IsNotEmpty()
    @IsMongoId()
    bill: String;

    @IsNotEmpty()
    @IsMongoId()
    from: String;

    @IsNotEmpty()
    @IsMongoId()
    @IsOptional()
    to?: String;

    @IsNotEmpty()
    @IsEnum(ORDERTYPE)
    type: String;
}