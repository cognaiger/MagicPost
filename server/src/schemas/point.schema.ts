import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, ObjectId } from "mongoose";
import { User } from "./user.schema";
import { PointType } from "src/common/const";

export type PointDocument = HydratedDocument<Point>;

@Schema()
export class Point {
    @Prop({ required: true })
    name: String;

    @Prop({ required: true })
    location: String;

    @Prop({ required: true, type: String, enum: PointType, default: PointType.TPoint })
    type: String;

    @Prop({ required: true, default: 0 })
    sentPackage: Number;

    @Prop({ required: true, default: 0 })
    pendingPackage: Number;

    @Prop({ required: true, default: 0 })
    receivedPackage: Number;

    @Prop({ type: mongoose.Types.ObjectId, ref: Point.name })
    associatedPoint: ObjectId;

    @Prop({ default: '' })
    managerName: String;

    @Prop({ required: true, default: 0 })
    suPackage: Number;

    @Prop({ required: true, default: 0 })
    returnPackage: Number;
}

export const PointSchema = SchemaFactory.createForClass(Point);