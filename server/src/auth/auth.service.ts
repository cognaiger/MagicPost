import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "src/schemas/user.schema";
import { RegisterDto } from "./dto/register.dto";
import * as bcrypt from 'bcrypt';
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

    async login(loginDto: LoginDto) {

    }

    async register(registerDto: RegisterDto) {
        const { email, fullName, password } = registerDto;

        const existingUser = await this.userModel.findOne({ email: email }).exec();
        if (existingUser) {
            throw new ConflictException("Email already exist!", { cause: new Error() });
        }

        const saltOrRounds = 10;
        const hash = await bcrypt.hash(password, saltOrRounds);

        return await new this.userModel({
            email: email,
            fullName: fullName,
            password: password,
            createdAt: new Date()
        }).save();
    }
}