import { Module } from "@nestjs/common";
import { BillController } from "./bill.controller";
import { BillService } from "./bill.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Bill, BillSchema } from "src/schemas/bill.schema";
import { Point, PointSchema } from "src/schemas/point.schema";

@Module({
    controllers: [BillController],
    providers: [BillService],
    imports: [
        MongooseModule.forFeature([
            { name: Bill.name, schema: BillSchema },
            { name: Point.name, schema: PointSchema }
        ])
    ]
})
export class BillModule {

}