import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, ObjectId } from "mongoose";
import { Point } from "./point.schema";
import { FailOption, PackageType } from "src/common/const";

export type BillDocument = HydratedDocument<Bill>;

@Schema({ _id: false })
class Sender {
    @Prop()
    email: String;

    @Prop({ required: true })
    name: String;

    @Prop({ required: true })
    mobile: String;

    @Prop({ required: true })
    address: String;

    @Prop({ type: mongoose.Types.ObjectId, ref: Point.name })
    point: ObjectId;
}
const senderSchema = SchemaFactory.createForClass(Sender);

@Schema({ _id: false })
class Receiver {
    @Prop()
    email: String;

    @Prop({ required: true })
    name: String;

    @Prop({ required: true })
    mobile: String;

    @Prop({ required: true })
    address: String;

    @Prop({ type: mongoose.Types.ObjectId, ref: Point.name })
    point: ObjectId;
}
const receiverSchema = SchemaFactory.createForClass(Receiver);

@Schema()
export class Bill {
    @Prop({ type: senderSchema })
    sender: Sender;

    @Prop({ type: receiverSchema })
    receiver: Receiver;

    @Prop({ required: true, type: String, enum: PackageType, default: PackageType.Document })
    packageType: String;

    @Prop({ required: true, type: String, enum: FailOption, default: FailOption.Op1 })
    failOption: String;

    @Prop({ required: true})
    timeSent: Date;

    @Prop()
    timeReceived: Date;

    @Prop({ required: true })
    fee: Number;

    @Prop({ required: true })
    weigh: Number;

    @Prop({ required: true })
    receiverPayment: Number;
}

export const BillSchema = SchemaFactory.createForClass(Bill);