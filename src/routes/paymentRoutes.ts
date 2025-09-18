import { Router, Request, Response, NextFunction } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import { PaymentController } from "../controllers/paymentController";
import { paymentFilter } from "../types/payment.types";

const paymentRouter = Router();

paymentRouter.get(
  "/get/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const leaseId = req.params.id;
    const controller = new PaymentController();
    const lease = await controller.getaPaymentId(leaseId);
    res.status(200).json(lease);
  })
);

paymentRouter.get(
  "/get-all",
  asyncHandler(async (req: Request, res: Response) => {
    const pageNo = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const filters: paymentFilter = {
      residentId: req.query.user as string,
      ownerId: req.query.owner as string,
      title: req.query.title as string,
    };
    const sort = (req.query.sort as string) || undefined;
    const controller = new PaymentController();
    const lease = await controller.getAllPayments(pageNo, limit, filters, sort);
    res.status(200).json(lease);
  })
);

paymentRouter.delete(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const leaseId = req.params.id;
    const controller = new PaymentController();
    const lease = await controller.deletePayment(leaseId);
    res.status(200).json(lease);
  })
);
export default paymentRouter;
