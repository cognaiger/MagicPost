import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { DeliveryOrder, DeliveryOrderDocument } from "src/schemas/deliveryOrder.schema";
import { AddOrderDto } from "./dto/addOrder.dto";
import { BillStatus, OrderStatus } from "src/common/const";
import { Bill, BillDocument } from "src/schemas/bill.schema";

@Injectable()
export class OrderService {
    constructor(
        @InjectModel(DeliveryOrder.name) private readonly orderModel: Model<DeliveryOrderDocument>,
        @InjectModel(Bill.name) private readonly billModel: Model<BillDocument>
    ) {
    }

    async addOrder(addOrderDto: AddOrderDto) {
        const { bill, from, to } = addOrderDto;
        const res = await new this.orderModel({
            bill: bill,
            from: from,
            to: to,
            status: OrderStatus.NotConfirmed,
            createdAt: new Date()
        }).save();
        if (res) {
            return await this.billModel.updateOne({
                _id: bill
            }, {
                $set: { status: BillStatus.InTransit }
            })
        }
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
        return await this.orderModel.find({
            to: id
        }, 'bill from createdAt').populate('from', 'name').exec();
    }

    async confirmOrder(id: string) {
        const order = await this.orderModel.findByIdAndUpdate(id, {
            status: OrderStatus.Confirmeed,
            confirmedAt: new Date()
        });
        if (order) {
            return await this.billModel.findByIdAndUpdate(order.bill, {
                currentPoint: order.to
            });
        } else {
            return
        }
    }
}