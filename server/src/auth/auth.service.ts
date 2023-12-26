import { ConflictException, Inject, Injectable, NotAcceptableException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { User, UserDocument } from "src/schemas/user.schema";
import { RegisterDto } from "./dto/register.dto";
import * as bcrypt from 'bcrypt';
import { LoginDto } from "./dto/login.dto";
import { JwtService } from "@nestjs/jwt";
import { Role } from "src/common/const";
import { Point } from "src/schemas/point.schema";

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
        @InjectModel(Point.name) private readonly pointModel: Model<Document>,
        private readonly jwtService: JwtService
    ) { }

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

        const payload = {
            id: user.id,
            role: user.role
        }

        let userInfo;
        if (user.role === Role.EPManager || user.role === Role.EPOperator) {
            userInfo = await this.userModel
                .findOne({ email: email })
                .populate('ePoint')
                .exec();

            return {
                accessToken: await this.jwtService.signAsync(payload),
                name: userInfo.fullName,
                epoint: userInfo.ePoint._id,
                branch: userInfo.ePoint.name,
                associatedPoint: userInfo.ePoint.associatedPoint
            }
        } else if (user.role === Role.CPManager || user.role === Role.CPStaff) {
            userInfo = await this.userModel
                .findOne({ email: email })
                .populate('cPoint')
                .exec();

            return {
                accessToken: await this.jwtService.signAsync(payload),
                name: userInfo.fullName,
                cpoint: userInfo.cPoint._id,
                branch: userInfo.cPoint.name,
            }
        }

        return {
            accessToken: await this.jwtService.signAsync(payload),
            name: user.fullName,
        }
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
            role: "Client",
            createdAt: new Date()
        }).save();
    }

    async bregister(registerDto: RegisterDto) {
        const { email, fullName, password, role, ePoint, cPoint, branch } = registerDto;

        if (role !== Role.EPManager && role !== Role.CPManager) {
            throw new ConflictException("Can't create this type of accounts", { cause: new Error() });
        }

        const existingUser = await this.userModel.findOne({ email: email }).exec();
        if (existingUser) {
            throw new ConflictException("Email already exist!", { cause: new Error() });
        }

        const saltOrRounds = 10;
        const hash = await bcrypt.hash(password, saltOrRounds);

        if (role === Role.EPManager) {
            await this.pointModel.findByIdAndUpdate(ePoint, {
                $set: { managerName: fullName }
            })
        } else {
            await this.pointModel.findByIdAndUpdate(cPoint, {
                $set: { managerName: fullName }
            })
        }

        return await new this.userModel({
            email: email,
            fullName: fullName,
            password: hash,
            role: role,
            ePoint: ePoint,
            cPoint: cPoint,
            branch: branch,
            createdAt: new Date()
        }).save();
    }

    async epregister(registerDto: RegisterDto) {
        const { email, fullName, password, branch, ePoint } = registerDto;

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
            role: "EPOperator",
            branch: branch,
            ePoint: ePoint,
            createdAt: new Date()
        }).save();
    }

    async cpregister(registerDto: RegisterDto) {
        const { email, fullName, password, branch, cPoint } = registerDto;

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
            role: "CPStaff",
            branch: branch,
            cPoint: cPoint,
            createdAt: new Date()
        }).save();
    }

    async getAccount(type: string, branchId: string) {
        if (branchId === "all") {
            const account = await this.userModel
                .find({ role: type }, 'email fullName role branch')
                .sort({ createdAt: -1 })
                .exec();
            return account;
        }
        return await this.userModel
            .find({
                role: type, $or: [
                    { ePoint: branchId },
                    { cPoint: branchId }
                ]
            })
            .sort({ createdAt: -1 })
            .exec();
    }

    async deleteAccount(id: string) {
        if (!mongoose.isValidObjectId(id)) {
            throw new NotFoundException("Invalid ObjectId", { cause: new Error() });
        }
        return await this.userModel.findByIdAndDelete(id).exec();
    }
}