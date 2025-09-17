import BuildingModle from "../models/buildingMode";
import {
    BuildingFilter,
    createBuildingParams,
    updateBuildingParams,
} from "../types/building.types";
import { AuthServices } from "./authServices";

export class BuildingServices {
    async create(params: createBuildingParams) {
        const authServices = new AuthServices();
        const isOwner = await authServices.isNotaUser(params.ownerId);
        if (!isOwner) {
            throw new Error("you are not an owner");
        }
        const newBuilding = await BuildingModle.create(params);
        return newBuilding;
    }

    async updateBuildingById(buildingId: string, params: updateBuildingParams) {
        const building = await BuildingModle.findByIdAndUpdate(
            buildingId,
            params,
            { new: true }
        );
        if (!building) {
            const error = new Error("Building not found");
            (error as any).code = "bs-ubbi";
            (error as any).status = 404;
            throw error;
        }
        return building;
    }

    async deleteBuildingById(buildingId: string) {
        const building = await BuildingModle.findByIdAndDelete(buildingId);
        if (!building) {
            const error = new Error("Building not found");
            (error as any).code = "bs-dbbi";
            (error as any).status = 404;
            throw error;
        }
        return building;
    }

    async isExist(buildingId: string) {
        const exist = await BuildingModle.exists({ _id: buildingId });
        if (!exist) {
            const error = new Error("Building not found");
            (error as any).code = "bs-ie";
            (error as any).status = 404;
            throw error;
        }
        return true;
    }

    async getAllBuildings(
        pageNo: number,
        limit: number,
        filters: BuildingFilter,
        sort: string = "createdAt"
    ) {
        const skip = (pageNo - 1) * limit;
        const query = Object.fromEntries(
            Object.entries(filters).filter(([_, v]) => v !== undefined)
        );
        // Create a date range for the entire day
        const buildings = await BuildingModle.find(query)
            .sort(sort)
            .skip(skip)
            .limit(limit);
        const total = await BuildingModle.countDocuments(query);
        const totalPages = Math.ceil(total / limit);
        const hasNextPage = pageNo < totalPages ? true : false;
        const hasPrevPage = pageNo > 1 ? true : false;
        return {
            doc: buildings,
            totalDocs: total,
            totalPages,
            limit,
            page: pageNo,
            hasNextPage,
            hasPrevPage,
        };
    }

    async getBuildingById(buildingId: String) {
        const building = await BuildingModle.findById(buildingId);
        if (!building) {
            const error = new Error("Building not found");
            (error as any).code = "bs-gbbi";
            (error as any).status = 404;
            throw error;
        }
        return building;
    }

    // [TODO]: Implement permision handling
    // async hasPermision(userId: string, buildingId: string) {}
}