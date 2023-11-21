import { Module } from "@nestjs/common";
import { OrderController } from "./deliveryOrder.controller";
import { OrderService } from "./deliveryOrder.service";
import { MongooseModule } from "@nestjs/mongoose";
import { DeliveryOrder, DeliveryOrderSchema } from "src/schemas/deliveryOrder.schema";

@Module({
    controllers: [OrderController],
    providers: [OrderService],
    imports: [
        MongooseModule.forFeature([
            { name: DeliveryOrder.name, schema: DeliveryOrderSchema }
        ])
    ]
})
export class OrderModule {

}