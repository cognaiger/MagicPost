import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, ObjectId } from "mongoose";
import { Bill, BillSchema } from "./bill.schema";
import { Point } from "./point.schema";
import { ORDERTYPE, OrderStatus } from "src/common/const";

export type DeliveryOrderDocument = HydratedDocument<DeliveryOrder>;

@Schema()
export class DeliveryOrder {
    @Prop({ type: mongoose.Types.ObjectId, ref: Bill.name })
    bill: ObjectId;

    @Prop({ type: mongoose.Types.ObjectId, ref: Point.name })
    from: ObjectId;

    @Prop({ required: true, type: mongoose.Types.ObjectId, ref: Point.name, default: '656b4524130a2b089708c464' })
    to: ObjectId;

    @Prop({ required: true, type: String, enum: OrderStatus, default: OrderStatus.NotConfirmed })
    status: String;

    @Prop({ required: true, type: String, enum: ORDERTYPE })
    type: String;

    @Prop({ required: true })
    createdAt: Date;

    @Prop()
    confirmedAt: Date;
}

export const DeliveryOrderSchema = SchemaFactory.createForClass(DeliveryOrder);

