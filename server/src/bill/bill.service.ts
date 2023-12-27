import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { Bill, BillDocument } from "src/schemas/bill.schema";
import { AddBillDto } from "./dto/addBill.dto";
import { Point, PointDocument } from "src/schemas/point.schema";
import { ALLPOINT } from "src/common/const";

@Injectable()
export class BillService {
    constructor(
        @InjectModel(Bill.name) private readonly billModel: Model<BillDocument>,
        @InjectModel(Point.name) private readonly pointModel: Model<PointDocument>
        ) { }

    async getAllBill() {
        return await this.billModel.find(null, '_id sender.name receiver.name timeSent status');
    }

    async getBillByPoint(id: string) {
        return await this.billModel.find({ 'sender.point': id }, '_id sender.name receiver.name timeSent status').sort({ timeSent: -1 });
    }

    async getBillAtPoint(id: string) {
        return await this.billModel.find(
            { 
                currentPoint: id,
                'sender.point': { $not: { $eq: id } }
            }, 
            '_id sender.name receiver.name timeSent status'
        );
    }

    async addBill(addBillDto: AddBillDto) {
        await this.pointModel.findOneAndUpdate(
            { _id: addBillDto.senderPoint },
            { $inc: { sentPackage: 1, pendingPackage: 1 } },
            { new: true}
        );
        await this.pointModel.findOneAndUpdate(
            { _id: ALLPOINT },
            { $inc: { sentPackage: 1 } }
        );

        return await new this.billModel({
            sender: {
                email: addBillDto.senderEmail,
                name: addBillDto.senderName,
                mobile: addBillDto.senderNum,
                address: addBillDto.senderAddr,
                point: addBillDto.senderPoint
            },
            receiver: {
                email: addBillDto.receiverEmail,
                name: addBillDto.receiverName,
                mobile: addBillDto.receiverNum,
                address: addBillDto.receiverAddr,
                point: addBillDto.receiverPoint
            },
            packageType: addBillDto.packageType,
            failOption: addBillDto.failOption,
            timeSent: new Date(),
            fee: addBillDto.fee,
            weigh: addBillDto.weigh,
            receiverPayment: addBillDto.receiverPayment,
            currentPoint: addBillDto.senderPoint
        }).save();
    }

    async getBillById(id: string) {
        return await this.billModel.findById(id).populate('receiver.point', 'associatedPoint').exec();
    }

    async deleteById(id: string) {
        if (!mongoose.isValidObjectId(id)) {
            throw new NotFoundException("Invalid ObjectId", { cause: new Error() });
        }
        return await this.billModel.findByIdAndDelete(id).exec();
    }
}