import { Body, Controller, Post } from "@nestjs/common";
import { Public } from "src/decorator/public.decorator";
import { BillService } from "./bill.service";
import { AddBillDto } from "./dto/addBill.dto";

@Controller('bill')
export class BillController {

    constructor(private readonly billService: BillService) {}

    @Public()
    @Post('/add')
    async addBill(@Body() addBillDto: AddBillDto): Promise<any> {
        return await this.billService.addBill(addBillDto);
    }
}