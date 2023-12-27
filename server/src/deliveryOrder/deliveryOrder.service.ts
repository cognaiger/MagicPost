import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { DeliveryOrder, DeliveryOrderDocument } from "src/schemas/deliveryOrder.schema";
import { AddOrderDto } from "./dto/addOrder.dto";
import { ALLPOINT, BillStatus, CONFIRMORDER, CUSTOMERPOINT, OrderStatus } from "src/common/const";
import { Bill, BillDocument } from "src/schemas/bill.schema";
import { Point, PointDocument } from "src/schemas/point.schema";

@Injectable()
export class OrderService {
    constructor(
        @InjectModel(DeliveryOrder.name) private readonly orderModel: Model<DeliveryOrderDocument>,
        @InjectModel(Bill.name) private readonly billModel: Model<BillDocument>,
        @InjectModel(Point.name) private readonly pointModel: Model<PointDocument>
    ) {
    }

    async addOrder(addOrderDto: AddOrderDto) {
        const { bill, from, to, type } = addOrderDto;
        const res = await new this.orderModel({
            bill: bill,
            from: from,
            to: to,
            type: type,
            status: OrderStatus.NotConfirmed,
            createdAt: new Date()
        }).save();
        if (res) {
            const billData = await this.billModel.findById(bill);
            if (billData.status === BillStatus.Pending) {
                return await this.billModel.updateOne({
                    _id: bill
                }, {
                    $set: { status: BillStatus.InTransit1 }
                })
            } else if (billData.status === BillStatus.AtCP1) {
                await this.pointModel.findOneAndUpdate(
                    { _id: from },
                    { $inc: { sentPackage: 1 } }
                );
                return await this.billModel.updateOne({
                    _id: bill
                }, {
                    $set: { status: BillStatus.InTransit2 }
                })
            } else if (billData.status === BillStatus.AtCP2) {
                await this.pointModel.findOneAndUpdate(
                    { _id: from },
                    { $inc: { sentPackage: 1 } }
                );
                return await this.billModel.updateOne(
                    { _id: bill },
                    { $set: { status: BillStatus.InTransit3 } }
                )
            } else {
                return await this.billModel.updateOne({
                    _id: bill
                }, {
                    $set: { status: BillStatus.InTransit4 }
                })
            }
        }
    }

    async cancelOrder(id: string) {
        const data = await this.orderModel.findById(id);
        if (!data) {
            throw new NotFoundException("Order not found", { cause: new Error() });
        }

        return await this.orderModel.findByIdAndUpdate(id, { status: OrderStatus.Cancel });
    }

    async getOrderFrom(id: string) {
        return await this.orderModel.find({
            from: id
        }, 'bill to createdAt status').populate('to', 'name').sort({ createdAt: -1 }).exec();
    }

    async getOrderTo(id: string) {
        return await this.orderModel.find({
            to: id
        }, 'bill from createdAt status').populate('from', 'name').sort({ createdAt: -1 }).exec();
    }

    async confirmSuccessOrder(id: string, type: string) {
        const order = await this.orderModel.findByIdAndUpdate(id, {
            status: OrderStatus.Confirmeed,
            confirmedAt: new Date()
        });
        if (order) {
            const bill = await this.billModel.findById(order.bill);
            if (type === CONFIRMORDER.RECEIVEBILL) {
                if (bill.status === BillStatus.InTransit2) {
                    await this.pointModel.findOneAndUpdate(
                        { _id: order.to },
                        { $inc: { receivedPackage: 1 } }
                    )

                    return await this.billModel.findByIdAndUpdate(order.bill, {
                        currentPoint: order.to,
                        status: BillStatus.AtCP2
                    });
                } else if (bill.status === BillStatus.InTransit1) {
                    await this.pointModel.findOneAndUpdate(
                        { _id: order.to },
                        { $inc: { receivedPackage: 1 } }
                    )
                    return await this.billModel.findByIdAndUpdate(order.bill, {
                        currentPoint: order.to,
                        status: BillStatus.AtCP1
                    });
                } else {
                    await this.pointModel.findOneAndUpdate(
                        { _id: bill.receiver.point },
                        { $inc: { receivedPackage: 1 } }
                    );
                    await this.pointModel.findOneAndUpdate(
                        { _id: ALLPOINT },
                        { $inc: { receivedPackage: 1 } }
                    );
                    return await this.billModel.findByIdAndUpdate(order.bill, {
                        currentPoint: order.to,
                        status: BillStatus.ReachDesEP
                    });
                }
            } else if (type === CONFIRMORDER.SUCCESSDELIVER) {
                await this.pointModel.findOneAndUpdate(
                    { _id: bill.sender.point },
                    { $inc: { suPackage: 1, pendingPackage: -1 } }
                );
                return await this.billModel.findByIdAndUpdate(order.bill, {
                    currentPoint: CUSTOMERPOINT,
                    status: BillStatus.Delivered
                });
            } else if (type === CONFIRMORDER.FAILDELIVER) {
                await this.pointModel.findOneAndUpdate(
                    { _id: bill.sender.point },
                    { $inc: { returnPackage: 1, pendingPackage: -1 } }
                )
                return await this.billModel.findByIdAndUpdate(order.bill, {
                    currentPoint: CUSTOMERPOINT,
                    status: BillStatus.FailAttempt
                });
            } else {

            }
        } else {
            throw new NotFoundException("Not found order with id", { cause: new Error() });
        }
    }

    async getOrderDetail(id: string) {
        return await this.orderModel.findOne({
            _id: id
        }).populate('bill').populate('from', 'name').populate('to', 'name').exec();
    }

    async getConfirmedOrderOfBill(id: string) {
        if (!mongoose.isValidObjectId(id)) {
            throw new NotFoundException("Invalid ObjectId", { cause: new Error() });
        }
        const existingBill = await this.billModel.findById(id).exec();
        if (!existingBill) {
            throw new NotFoundException("Bill not found", { cause: new Error() });
        }
        return await this.orderModel.find({
            bill: id,
            status: OrderStatus.Confirmeed
        }, 'status type confirmedAt').exec();
    }

    async deleteOrder(id: string) {
        if (!mongoose.isValidObjectId(id)) {
            throw new NotFoundException("Invalid ObjectId", { cause: new Error() });
        }
        return await this.orderModel.findByIdAndDelete(id).exec();
    }
}