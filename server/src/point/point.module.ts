import { Module } from "@nestjs/common";
import { PointController } from "./point.controller";
import { PointService } from "./point.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Point, PointSchema } from "src/schemas/point.schema";

@Module({
    controllers: [PointController],
    providers: [PointService],
    imports: [
        MongooseModule.forFeature([
            { name: Point.name, schema: PointSchema }
        ])
    ]
})
export class PointModule {

}