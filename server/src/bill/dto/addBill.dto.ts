import { IsEmail, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString } from "class-validator";
import { FailOption, PackageType } from "src/common/const";

export class AddBillDto {
    @IsEmail()
    @IsOptional()
    senderEmail?: String;

    @IsString()
    @IsNotEmpty()
    senderName: String;

    @IsString()
    @IsNotEmpty()
    senderNum: String;

    @IsString()
    @IsNotEmpty()
    senderAddr: String;

    @IsMongoId()
    @IsNotEmpty()
    senderPoint: String;

    @IsEmail()
    @IsOptional()
    receiverEmail?: String;

    @IsString()
    @IsNotEmpty()
    receiverName: String;

    @IsString()
    @IsNotEmpty()
    receiverNum: String;

    @IsString()
    @IsNotEmpty()
    receiverAddr: String;

    @IsMongoId()
    @IsNotEmpty()
    receiverPoint: String;

    @IsEnum(PackageType)
    @IsNotEmpty()
    packageType: String;

    @IsEnum(FailOption)
    @IsNotEmpty()
    failOption: String;

    @IsNumberString()
    @IsNotEmpty()
    fee: Number;

    @IsNumberString()
    @IsNotEmpty()
    weigh: Number;

    @IsNumberString()
    @IsNotEmpty()
    receiverPayment: Number;
}