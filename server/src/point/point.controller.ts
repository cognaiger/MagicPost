import { Body, Controller, Get, Post } from "@nestjs/common";
import { PointService } from "./point.service";
import { AddLocationDto } from "./dto/addLocation.dto";
import { Public } from "src/decorator/public.decorator";

@Controller('point')
export class PointController {
    constructor(private readonly pointService: PointService) {}

    @Get('/')
    @Public()
    async getAllPoint(): Promise<any> {
        return await this.pointService.getAllPoint();
    }

    @Post('/add')
    @Public()
    async addLocation(@Body() addLocationDto: AddLocationDto): Promise<any> {
        return await this.pointService.addLocation(addLocationDto);
    }
}