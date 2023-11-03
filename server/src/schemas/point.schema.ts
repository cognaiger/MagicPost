import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, ObjectId } from "mongoose";
import { User } from "./user.schema";

export type PointDocument = HydratedDocument<Point>;

@Schema()
export class Point {
    @Prop({ required: true })
    name: String;

    @Prop({ required: true })
    location: String;

    @Prop({ required: true })
    sentPackage: Number;

    @Prop({ required: true })
    receivedPackage: Number;

    @Prop({ type: mongoose.Types.ObjectId, ref: User.name })
    manager: ObjectId;

    @Prop({ type: mongoose.Types.ObjectId, ref: Point.name })
    associatedPoint: ObjectId;

    @Prop()
    managerName: String;

    @Prop()
    suPackage: Number;

    @Prop()
    returnPackage: Number;
}

export const PointSchema = SchemaFactory.createForClass(Point);