import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, ObjectId } from "mongoose";
import { Point } from "./point.schema";

export type BillDocument = HydratedDocument<Bill>;

@Schema()
class Sender {
    @Prop()
    email: String;

    @Prop({ required: true })
    name: String;

    @Prop({ required: true })
    mobile: String;

    @Prop({ required: true })
    location: String;

    @Prop({ type: mongoose.Types.ObjectId, ref: Point.name })
    point: ObjectId;
}
const senderSchema = SchemaFactory.createForClass(Sender);

@Schema()
class Receiver {
    @Prop()
    email: String;

    @Prop({ required: true })
    name: String;

    @Prop({ required: true })
    mobile: String;

    @Prop({ required: true })
    location: String;

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

    @Prop({ required: true})
    timeSent: Date;

    @Prop()
    timeReceived: Date;

    @Prop({ required: true })
    fee: Number;

    @Prop({ required: true })
    weigh: Number;
}

export const BillSchema = SchemaFactory.createForClass(Bill);