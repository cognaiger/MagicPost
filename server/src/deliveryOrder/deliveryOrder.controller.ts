import { Body, Controller, Get, Param, Post, Put, Query } from "@nestjs/common";
import { OrderService } from "./deliveryOrder.service";
import { AddOrderDto } from "./dto/addOrder.dto";
import { Public } from "src/decorator/public.decorator";

@Controller('order')
export class OrderController {
    constructor(private readonly orderSerive: OrderService) {

    }

    @Public()
    @Get('/from')
    async getOrderFrom(@Query('id') id: string): Promise<any> {
        return await this.orderSerive.getOrderFrom(id);
    }

    @Public()
    @Get('/to')
    async getOrderTo(@Query('id') id: string): Promise<any> {
        return await this.orderSerive.getOrderTo(id);
    }

    @Public()
    @Post('/add')
    async addOrder(@Body() addOrderDto: AddOrderDto): Promise<any> {
        return await this.orderSerive.addOrder(addOrderDto);
    }

    @Public()
    @Put('/confirm')
    async confirmOrder(@Query('id') id: string): Promise<any> {
        return await this.orderSerive.confirmOrder(id);
    }

    @Public()
    @Put("/cancel/:id")
    async cancelOrder(@Param('id') id: string): Promise<any> {
        return await this.orderSerive.cancelOrder(id);
    }
}