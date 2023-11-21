import { IsMongoId, IsNotEmpty } from "class-validator";

export class AddOrderDto {
    @IsNotEmpty()
    @IsMongoId()
    bill: String;

    @IsNotEmpty()
    @IsMongoId()
    from: String;

    @IsNotEmpty()
    @IsMongoId()
    to: String;
}