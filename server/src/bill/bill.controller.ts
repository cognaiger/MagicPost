import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { Public } from "src/decorator/public.decorator";
import { BillService } from "./bill.service";
import { AddBillDto } from "./dto/addBill.dto";

@Controller('bill')
export class BillController {

    constructor(private readonly billService: BillService) {}

    @Public()
    @Get()
    async getAllBill(): Promise<any> {
        return await this.billService.getAllBill();
    }

    @Public()
    @Post('/add')
    async addBill(@Body() addBillDto: AddBillDto): Promise<any> {
        return await this.billService.addBill(addBillDto);
    }

    @Public()
    @Get(":id")
    async getBillById(@Param('id') id: string): Promise<any> {
        return await this.billService.getBillById(id);
    }
}