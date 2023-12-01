import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, ObjectId } from "mongoose";
import { Role } from "src/common/const";
import { Point } from "./point.schema";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({ required: true })
    email: String;

    @Prop({ required: true })
    fullName: String;

    @Prop({ required: true })
    password: String;

    @Prop({ required: true, type: String, enum: Role, default: Role.Client })
    role: String;

    @Prop({ required: true })
    createdAt: Date;

    @Prop()
    modifiedAt?: Date;

    @Prop()
    deletedAt?: Date;

    @Prop({ type: mongoose.Types.ObjectId, ref: Point.name })
    ePoint: ObjectId;

    @Prop({ type: mongoose.Types.ObjectId, ref: Point.name })
    cPoint: ObjectId;

    @Prop()
    branch: String;
}

export const UserSchema = SchemaFactory.createForClass(User);