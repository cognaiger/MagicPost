import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, ObjectId } from "mongoose";
import { Bill } from "./bill.schema";
import { Point } from "./point.schema";
import { OrderStatus } from "src/common/const";

export type DeliveryOrderDocument = HydratedDocument<DeliveryOrder>;

@Schema()
export class DeliveryOrder {
    @Prop({ type: mongoose.Types.ObjectId, ref: Bill.name })
    bill: ObjectId;

    @Prop({ type: mongoose.Types.ObjectId, ref: Point.name })
    from: ObjectId;

    @Prop({ type: mongoose.Types.ObjectId, ref: Point.name })
    to: ObjectId;

    @Prop({ required: true, type: String, enum: OrderStatus, default: OrderStatus.NotConfirmed })
    status: String;

    @Prop({ required: true })
    createdAt: Date;

    @Prop()
    confirmedAt: Date;
}

export const DeliveryOrderSchema = SchemaFactory.createForClass(DeliveryOrder);