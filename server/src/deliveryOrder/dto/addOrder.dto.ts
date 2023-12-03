import { IsMongoId, IsNotEmpty, IsOptional } from "class-validator";

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
}