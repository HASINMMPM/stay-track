import { Router, Request, Response } from "express";
import { AuthController } from "../controllers/authController";
import { validate } from "../middleware/validate";
import { validationSchemas } from "../utils/validationSchemas";
import { asyncHandler } from "../middleware/asyncHandler";

const router = Router();

const validationSchemasInstance = new validationSchemas();
const authController = new AuthController();
router.post(
  "/register",
  validate(validationSchemasInstance.registrationSchema),
  asyncHandler(async (req: Request, res: Response) => {
    console.log("Registration request received");
    const { name, email, password, mobileNumber, role } = req.body;
    const user = await authController.registration(name, email, password, mobileNumber, role);
    res.json(user);
  }));

router.post(
  "/login",
  validate(validationSchemasInstance.loginSchema),
  asyncHandler(async (req: Request, res: Response) => {
    console.log("Login request received");
    const { email, password } = req.body;
    const user = await authController.login(email, password);
    res.json(user);
  }));

export default router;
