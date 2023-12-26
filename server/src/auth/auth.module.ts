import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/schemas/user.schema";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./guard/auth.guard";
import { Point, PointSchema } from "src/schemas/point.schema";

@Module({
    controllers: [AuthController],
    providers: [
        AuthService,
        {
            provide: APP_GUARD,
            useClass: AuthGuard
        }
    ],
    imports: [
        MongooseModule.forFeature([
        { name: User.name, schema: UserSchema },
        { name: Point.name, schema: PointSchema }
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