import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Point, PointDocument } from "src/schemas/point.schema";
import { AddLocationDto } from "./dto/addLocation.dto";

@Injectable()
export class PointService {
    constructor(@InjectModel(Point.name) private readonly pointModel: Model<PointDocument>) {}

    async getAllPoint(type: string) {
        if (type === 'all') {
            return await this.pointModel.find(null, 'name location type managerName').exec();
        } else if (type === 'ep') {
            return await this.pointModel.find({ type: 'EPoint' }, 'name location type managerName').exec();
        } 
        
        return await this.pointModel.find({ type: 'CPoint' }, 'name location type managerName').exec();
    }

    async addLocation(addLocationDto: AddLocationDto) {
        const { name, location, type } = addLocationDto;

        const existingLocation = await this.pointModel.findOne({ name: name }).exec();
        if (existingLocation) {
            throw new ConflictException("Location name already exist!", { cause: new Error() });
        }

        return await new this.pointModel({
            name: name,
            location: location,
            type: type
        }).save();
    }
}