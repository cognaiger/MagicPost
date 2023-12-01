import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Bill, BillDocument } from "src/schemas/bill.schema";
import { AddBillDto } from "./dto/addBill.dto";

@Injectable()
export class BillService {
    constructor(@InjectModel(Bill.name) private readonly billModel: Model<BillDocument>) { }

    async getAllBill() {
        return await this.billModel.find(null, '_id sender.name receiver.name timeSent status');
    }

    async getBillByPoint(id: string) {
        return await this.billModel.find({ 'sender.point': id }, '_id sender.name receiver.name timeSent status');
    }

    async addBill(addBillDto: AddBillDto) {
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
            receiverPayment: addBillDto.receiverPayment
        }).save();
    }

    async getBillById(id: string) {
        return await this.billModel.findById(id).exec();
    }
}