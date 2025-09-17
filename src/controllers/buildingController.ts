import { BuildingServices } from "../services/buildingServices";
import {
    BuildingFilter,
    createBuildingParams,
    updateBuildingParams,
} from "../types/building.types";

export class BuildingController {
    async createBuildingController(params: createBuildingParams) {
        const service = new BuildingServices();
        const building = await service.create(params);
        return building;
    }

    async updateBuildingController(
        buildingId: string,
        params: updateBuildingParams
    ) {
        const service = new BuildingServices();
        const building = await service.updateBuildingById(buildingId, params);
        return building;
    }

    async getAllBuildingsController(
        pageNo: number,
        limit: number,
        filter: BuildingFilter,
        sort?: string
    ) {
        const service = new BuildingServices();
        const buildings = await service.getAllBuildings(
            pageNo,
            limit,
            filter,
            sort
        );
        return buildings;
    }

    async getSingleBuildingController(buildingId: string) {
        const service = new BuildingServices();
        const building = await service.getBuildingById(buildingId);
        return building;
    }

    async deleteBuildingController(buildingId: string) {
        const service = new BuildingServices();
        const building = await service.deleteBuildingById(buildingId);
        return building;
    }
}