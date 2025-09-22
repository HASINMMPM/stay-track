import { Router, Request, Response } from "express";
import { validate } from "../middleware/validate";
import { validationSchemas } from "../utils/validationSchemas";
import { asyncHandler } from "../middleware/asyncHandler";
import { BuildingController } from "../controllers/buildingController";
import { BuildingFilter } from "../types/building.types";

const buildingRoutes = Router();

const validationSchemasInstance = new validationSchemas();
buildingRoutes.post(
  "/create",
  validate(validationSchemasInstance.createBuildingSchema),
  asyncHandler(async (req: Request, res: Response) => {
    const params = req.body;
    const controller = new BuildingController();
    const building = await controller.createBuildingController(params);
    res.status(201).json(building);
  })
);

buildingRoutes.put(
  "/update/:id",
  validate(validationSchemasInstance.updateBuildingSchema),
  asyncHandler(async (req: Request, res: Response) => {
    const params = req.body;
    const controller = new BuildingController();
    const building = await controller.updateBuildingController(req.params.id,params);
    res.status(200).json(building);
  })
);

buildingRoutes.delete(
  "/delete/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const controller = new BuildingController();
    const building = await controller.deleteBuildingController(req.params.id);
    res.status(200).json(building);
  })
);

buildingRoutes.get(
  "/get/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const buildingId = req.params.id;
    const controller = new BuildingController();
    const building = await controller.getSingleBuildingController(buildingId);
    res.status(200).json(building);
  })
);

buildingRoutes.get(
  "/get-all",
  asyncHandler(async (req: Request, res: Response) => { const pageNo = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const filters: BuildingFilter = {
        city: req.query.city as string,
        district: req.query.dist as string,
        lat: req.query.lat as string,
        local: req.query.local as string,
        long: req.query.long as string,
        name: req.query.name as string,
        ownerId: req.query.user as string,
        state: req.query.state as string,
        thaluk: req.query.thaluk as string,
    };
    const sort = req.query.sort as string;
    const controller = new BuildingController();
    const buildings = await controller.getAllBuildingsController(
        pageNo,
        limit,
        filters,
        sort
    );
    res.status(200).json(buildings);
  })
);

buildingRoutes.put(
  "/update-status/:id",
  validate(validationSchemasInstance.updateBuildingStatusSchema),
  asyncHandler(async (req: Request, res: Response) => {
    const controller = new BuildingController();
    const building = await controller.updateBuildingStatusController(req.params.id, req.body.status);
    res.status(200).json(building);
  })
);
export default buildingRoutes;
