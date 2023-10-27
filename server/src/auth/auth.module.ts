import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/schemas/user.schema";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [
        MongooseModule.forFeature([
        { name: User.name, schema: UserSchema }
        ]),
        JwtModule.registerAsync({
            useFactory: (ConfigService: ConfigService) => {
                return {
                    secret: "iamragnar",
                    signOptions: { expiresIn: '4h' }
                };
            },
            inject: [ConfigService],
            global: true
        })
    ]
})

export class AuthModule {}