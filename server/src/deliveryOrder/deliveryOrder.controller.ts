import { Body, Controller, Delete, Param, Post, Put } from "@nestjs/common";
import { OrderService } from "./deliveryOrder.service";
import { AddOrderDto } from "./dto/addOrder.dto";
import { Public } from "src/decorator/public.decorator";

@Controller('order')
export class OrderController {
    constructor(private readonly orderSerive: OrderService) {

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