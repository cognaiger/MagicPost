import { Prop, Schema } from "@nestjs/mongoose";
import mongoose, { ObjectId } from "mongoose";
import { Bill } from "./bill.schema";
import { Point } from "./point.schema";

@Schema()
export class DeliveryOrder {
    @Prop({ type: mongoose.Types.ObjectId, ref: Bill.name })
    bill: ObjectId;

    @Prop({ type: mongoose.Types.ObjectId, ref: Point.name })
    from: ObjectId;

    @Prop({ type: mongoose.Types.ObjectId, ref: Point.name })
    to: ObjectId;

    @Prop()
    status: String;

    @Prop({ required: true })
    createdAt: Date;

    @Prop()
    confirmedAt: Date;
}