import { Body, Controller, Get, Param, Post, Put, Query } from "@nestjs/common";
import { OrderService } from "./deliveryOrder.service";
import { AddOrderDto } from "./dto/addOrder.dto";
import { Public } from "src/decorator/public.decorator";
import { ConfirmOrderDto } from "./dto/confirmOrder.dto";

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
    async confirmSucessOrder(@Body() confirmOrderDto: ConfirmOrderDto): Promise<any> {
        const { id, type } = confirmOrderDto;
        return await this.orderSerive.confirmSuccessOrder(id, type);
    }

    @Public()
    @Put("/cancel/:id")
    async cancelOrder(@Param('id') id: string): Promise<any> {
        return await this.orderSerive.cancelOrder(id);
    }

    @Public()
    @Get("/ofbill")
    async getConfirmedOrderOfBill(@Query('id') id: string): Promise<any> {
        return await this.orderSerive.getConfirmedOrderOfBill(id);
    }

    @Public()
    @Get("/:id")
    async getOrderDetail(@Param('id') id: string): Promise<any> {
        return await this.orderSerive.getOrderDetail(id);
    }
}