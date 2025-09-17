import UserModel from "../models/authModel";
import { Hashes } from "../utils/hashes";

export class AuthServices {
  async registration(
    name: string,
    email: string,
    password: string,
    mobileNumber: string,
    role: string
  ) {
    const isUserExists = await UserModel.findOne({ email:email, mobileNumber:mobileNumber });
    if (isUserExists) {
      throw new Error("User already exists with this email or mobile number");
    }
    const hashes = new Hashes();
    const hashedPassword = await hashes.hashPassword(password);
    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      mobileNumber,
      role,
    });
    return user;
  }
  async login(email: string, password: string) {
    const user = await UserModel.findOne({ email:email });
    if (!user) {
      throw new Error("User not found");
    }
    const hashes = new Hashes();
    const isPasswordValid = await hashes.comparePassword(password, user.password as string);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
    return user;
  }
  async isNotaUser(id: string) {
    const user = await UserModel.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    if (user.role != "owner") {
      return false;
    }
    return true;
  }
}
