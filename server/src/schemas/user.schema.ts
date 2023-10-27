import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { UserRole } from "src/common/const";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    fullName: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true, type: String, enum: UserRole, default: UserRole.Client })
    type: UserRole;

    @Prop({ required: true })
    createdAt: Date;

    @Prop()
    modifiedAt?: Date

    @Prop()
    deletedAt?: Date
}

export const UserSchema = SchemaFactory.createForClass(User);