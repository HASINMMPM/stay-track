import { Router, Request, Response, NextFunction } from "express";
import { validate } from "../middleware/validate";
import { validationSchemas } from "../utils/validationSchemas";
import { asyncHandler } from "../middleware/asyncHandler";
import { LeaseController } from "../controllers/leaseController";
import { LeaseFilterI } from "../types/lease.types";

const leaseRouter = Router();

const validationSchemasInstance = new validationSchemas();

leaseRouter.post(
  "/create",
  validate(validationSchemasInstance.createLeaseSchema),
  asyncHandler(async (req: Request, res: Response) => {
    const controller = new LeaseController();
    const lease = await controller.registerLeaseController(req.body);
    res.status(200).json(lease);
  })
);

leaseRouter.get(
  "/get/:id",
  // validate(validationSchemasInstance.getLeaseByIdSchema),
  asyncHandler(async (req: Request, res: Response) => {
    const leaseId = req.params.id;
    const controller = new LeaseController();
    const lease = await controller.getLeaseByIdController(leaseId);
    res.status(200).json(lease);
  })
);

leaseRouter.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const pageNo = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const filters: LeaseFilterI = {
      tenantId: req.query.user as string,
      buildingId: req.query.building as string,
      status: req.query.status as string,
      moveIn: req.query.movein
        ? new Date(req.query.movein as string)
        : undefined,
      moveOut: req.query.moveout
        ? new Date(req.query.moveout as string)
        : undefined,
    };
    const sort = (req.query.sort as string) || undefined;
    const controller = new LeaseController();
    const lease = await controller.getAllLeaseController(
      pageNo,
      limit,
      filters,
      sort
    );
    res.status(200).json(lease);
  })
);

leaseRouter.delete(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const leaseId = req.params.id;
    const controller = new LeaseController();
    const lease = await controller.deleteController(leaseId);
    res.status(200).json(lease);
  })
);
export default leaseRouter;
