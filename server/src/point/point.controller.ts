import { Body, Controller, Delete, Get, Param, Post, Query } from "@nestjs/common";
import { PointService } from "./point.service";
import { AddLocationDto } from "./dto/addLocation.dto";
import { Public } from "src/decorator/public.decorator";

@Controller('point')
export class PointController {
    constructor(private readonly pointService: PointService) {}

    @Get('/')
    @Public()
    async getAllPoint(@Query('type') type: string): Promise<any> {
        return await this.pointService.getAllPoint(type);
    }

    @Post('/add')
    @Public()
    async addLocation(@Body() addLocationDto: AddLocationDto): Promise<any> {
        return await this.pointService.addLocation(addLocationDto);
    }

    @Get(':id')
    @Public()
    async getPointById(@Param('id') id: string): Promise<any> {
        return await this.pointService.getPointById(id);
    }

    @Public()
    @Delete("/")
    async deletePoint(@Query('id') id: string): Promise<any> {
        return await this.pointService.deletePoint(id);
    }
}