import { ConflictException, Injectable, NotAcceptableException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "src/schemas/user.schema";
import { RegisterDto } from "./dto/register.dto";
import * as bcrypt from 'bcrypt';
import { LoginDto } from "./dto/login.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
        private readonly jwtService: JwtService
    ) {}

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;

        const user = await this.userModel.findOne({ email: email }).exec();
        if (!user) {
            throw new NotFoundException("User not found", { cause: new Error() });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new NotAcceptableException("Password is wrong", { cause: new Error() });
        }

        const payload = { id: user.id }

        return {
            accessToken: await this.jwtService.signAsync(payload),
        };
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
            password: hash,
            createdAt: new Date()
        }).save();
    }
}