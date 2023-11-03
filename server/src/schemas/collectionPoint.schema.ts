import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, ObjectId } from "mongoose";

export type CPointDocument = HydratedDocument<CPoint>;

@Schema()
export class CPoint {
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
}

export const EPointSchema = SchemaFactory.createForClass(CPoint);