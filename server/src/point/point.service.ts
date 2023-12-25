import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Point, PointDocument } from "src/schemas/point.schema";
import { AddLocationDto } from "./dto/addLocation.dto";

@Injectable()
export class PointService {
    constructor(@InjectModel(Point.name) private readonly pointModel: Model<PointDocument>) { }

    async getAllPoint(type: string) {
        if (type === 'all') {
            return await this.pointModel.find({ type: { $in: ['EPoint', 'CPoint', 'all'] } }, 'name location type managerName sentPackage receivedPackage')
                .sort({ name: 1 }).exec();
        } else if (type === 'both') {
            return await this.pointModel.find({ type: { $in: ['EPoint', 'CPoint'] } }, 'name location type managerName sentPackage receivedPackage')
                .sort({ name: 1 }).exec();
        }
        else if (type === 'ep') {
            return await this.pointModel.find({ type: 'EPoint' }, 'name location type managerName sentPackage receivedPackage').exec();
        }

        return await this.pointModel.find({ type: 'CPoint' }, 'name location type managerName sentPackage receivedPackage').exec();
    }

    async addLocation(addLocationDto: AddLocationDto) {
        const { name, location, type, associatedPoint } = addLocationDto;

        const existingLocation = await this.pointModel.findOne({ name: name }).exec();
        if (existingLocation) {
            throw new ConflictException("Location name already exist!", { cause: new Error() });
        }

        return await new this.pointModel({
            name: name,
            location: location,
            type: type,
            associatedPoint: associatedPoint
        }).save();
    }

    async getPointById(id: string) {
        return await this.pointModel.find({ _id: id }, 'name type sentPackage pendingPackage receivedPackage suPackage returnPackage').exec();
    }
}