import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, ObjectId } from "mongoose";

export type EPointDocument = HydratedDocument<EPoint>;

@Schema()
export class EPoint {
    @Prop({ required: true })
    name: String;

    @Prop({ required: true })
    location: String;

    @Prop({ required: true })
    sentPackage: Number;

    @Prop({ required: true })
    receivedPackage: Number;

    @Prop({ type: mongoose.Types.ObjectId, ref: 'User' })
    manager: ObjectId;

    @Prop({ type: mongoose.Types.ObjectId, ref: 'CPoint' })
    cPoint: ObjectId;

    @Prop()
    managerName: String;

    @Prop()
    suPackage: Number;

    @Prop()
    returnPackage: Number;
}

export const EPointSchema = SchemaFactory.createForClass(EPoint);