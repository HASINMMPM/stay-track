import { AuthUtils } from "../utils/auth";
import { AuthServices } from "../services/authServices";

export class AuthController {
  async registration(
    name: string,
    email: string,
    password: string,
    mobileNumber: string,
    role: string
  ) {
    const authServices = new AuthServices();
    const user = await authServices.registration(
      name,
      email,
      password,
      mobileNumber,
      role
    );
    const authUtils = new AuthUtils();
    const token = await authUtils.generateToken(user._id.toString(), user.role);
    return { user, token };
  }
  async login(email: string, password: string) {
    const authServices = new AuthServices();
    const user = await authServices.login(email, password);
    const authUtils = new AuthUtils();
    const token = await authUtils.generateToken(user._id.toString(), user.role);
    return { user, token };
  }
}
