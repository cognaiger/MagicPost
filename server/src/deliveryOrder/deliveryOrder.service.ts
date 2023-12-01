import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { DeliveryOrder, DeliveryOrderDocument } from "src/schemas/deliveryOrder.schema";
import { AddOrderDto } from "./dto/addOrder.dto";
import { OrderStatus } from "src/common/const";

@Injectable()
export class OrderService {
    constructor(@InjectModel(DeliveryOrder.name) private readonly orderModel: Model<DeliveryOrderDocument>) {

    }

    async addOrder(addOrderDto: AddOrderDto) {
        const { bill, from, to } = addOrderDto;
        return await new this.orderModel({
            bill: bill,
            from: from,
            to: to,
            status: OrderStatus.NotConfirmed,
            createdAt: new Date()
        }).save();
    }

    async cancelOrder(id: string) {
        const data = await this.orderModel.findById(id);
        if (!data) {
            throw new NotFoundException("User not found", { cause: new Error() });
        }

        return await this.orderModel.findByIdAndUpdate(id, { status: OrderStatus.Cancel });
    }

    async getOrderFrom(id: string) {

    }

    async getOrderTo(id: string) {
        
    }
}