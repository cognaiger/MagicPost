import { Module } from "@nestjs/common";
import { BillController } from "./bill.controller";
import { BillService } from "./bill.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Bill, BillSchema } from "src/schemas/bill.schema";

@Module({
    controllers: [BillController],
    providers: [BillService],
    imports: [
        MongooseModule.forFeature([
            { name: Bill.name, schema: BillSchema }
        ])
    ]
})
export class BillModule {

}