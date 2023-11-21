import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { OrderService } from "./deliveryOrder.service";
import { AddOrderDto } from "./dto/addOrder.dto";
import { Public } from "src/decorator/public.decorator";

@Controller('order')
export class OrderController {
    constructor(private readonly orderSerive: OrderService) {

    }

    @Public()
    @Get('/from/:id')
    async getOrderFrom(@Param('id') id: string): Promise<any> {
        return await this.orderSerive.getOrderFrom(id);
    }

    @Public()
    @Get('/to/:id')
    async getOrderTo(@Param('id') id: string): Promise<any> {
        return await this.orderSerive.getOrderTo(id);
    }

    @Public()
    @Post('/add')
    async addOrder(@Body() addOrderDto: AddOrderDto): Promise<any> {
        return await this.orderSerive.addOrder(addOrderDto);
    }

    @Public()
    @Put("/cancel/:id")
    async cancelOrder(@Param('id') id: string): Promise<any> {
        return await this.orderSerive.cancelOrder(id);
    }
}