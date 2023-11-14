import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { Role } from "src/common/const";
import { Roles } from "src/decorator/roles.decorator";
import { AuthGuard } from "./guard/auth.guard";
import { Public } from "src/decorator/public.decorator";
import { RoleGuard } from "./guard/role.guard";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    };

    @Public()
    @Post('login')
    async login(@Body() loginDto: LoginDto): Promise<any> {
        return await this.authService.login(loginDto);
    }

    @Public()
    @Post('register')
    async register(@Body() registerDto: RegisterDto): Promise<any> {
        return await this.authService.register(registerDto);
    }

    @Roles(Role.Boss)
    @UseGuards(RoleGuard)
    @Post('bregister')
    async bregister(@Body() registerDto: RegisterDto): Promise<any> {
        return await this.authService.bregister(registerDto);
    }

    @Roles(Role.EPManager)
    @Post('epregister')
    async epregister(@Body() registerDto: RegisterDto): Promise<any> {
        return await this.authService.epregister(registerDto);
    }

    @Roles(Role.CPManager)
    @Post('cpregister')
    async cpregister(@Body() registerDto: RegisterDto): Promise<any> {
        return await this.authService.cpregister(registerDto);
    }
}