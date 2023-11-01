import { IsEmail, IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { Role } from "src/common/const";

export class RegisterDto {
    @IsEmail()
    @IsNotEmpty()
    @MaxLength(50)
    email: string;

    @IsString()
    @MinLength(2)
    @MaxLength(30)
    fullName: string;

    @IsString()
    @MinLength(8)
    @MaxLength(100)
    password: string;

    @IsEnum(Role)
    @IsNotEmpty()
    role: string;
}