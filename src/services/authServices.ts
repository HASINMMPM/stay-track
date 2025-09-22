import OtpModel from "../models/otpModel";
import UserModel from "../models/authModel";
import { Hashes } from "../utils/hashes";

export class AuthServices {
  async registration(
    name: string,
    email: string,
    password: string,
    mobileNumber: string,
    role: string,
    otp: string
  ) {
    
    const verifyOtp = await this.verifyOtp(otp, email);
    if (!verifyOtp) {
      throw new Error("Invalid or expired OTP. Please use the correct OTP.");
    }

    const isUserExists = await UserModel.findOne({
      email: email,
      mobileNumber: mobileNumber,
    });
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
    // Validate input parameters
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const user = await UserModel.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid email or password");
    }

    const hashes = new Hashes();
    const isPasswordValid = await hashes.comparePassword(
      password,
      user.password as string
    );
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
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
  async isEmailExists(email: string) {
    const user = await UserModel.findOne({ email: email });
    if (user) {
      return true;
    }
    return false;
  }
  async isMobileNumberExists(mobileNumber: string) {
    const user = await UserModel.findOne({ mobileNumber: mobileNumber });
    if (user) {
      return true;
    }
    return false;
  }
  async sendOtp(
    email: string,
    type: string,
    generateOtp: number,
    mobileNumber: string
  ) {
    console.log(
      "params in services ✅",
      generateOtp,
      email,
      type,
      mobileNumber
    );
    const isOtpExists = await OtpModel.findOne({ email: email, type: type });
    if (isOtpExists) {
      await this.deleteOtpByemail(email, type,undefined);
    }
      const isEmailExists = await this.isEmailExists(email);
      const isMobileNumberExists = await this.isMobileNumberExists(mobileNumber);
      console.log("isEmailExists",isEmailExists,"isMobileNumberExists",isMobileNumberExists,"type",type);
    if ((isEmailExists || isMobileNumberExists) && type == "register") {
      throw new Error("Email and mobile number already exists please login");
    }
    if (!isEmailExists && type == "resetPassword") {
      throw new Error("User not found with this email or mobile number");
    }
    const otp = await OtpModel.create({
      email,
      type,
      otp: generateOtp.toString(),
    });
    return { otp, message: "Otp Send successfully" };
  }

  async verifyOtp(otp: string, email: string) {
    const verifyOtp = await OtpModel.findOne({ email: email, otp: otp });
    if (verifyOtp) {
      await this.deleteOtpByemail(email, undefined, otp);
      return true;
    }
    return false;
  }

  async deleteOtpByemail(email: string, type?: string, otp?: string) {
    if (type) {
      const deletedOtp = await OtpModel.findOneAndDelete({
        email: email,
        type: type,
      });
      if (!deletedOtp) {
        throw new Error("otp delete failed");
      }
      console.log("otp deleted by email and type");
      return "deleted otp by email and type";
    }
    if (otp) {
      const deletedOtp = await OtpModel.findOneAndDelete({
        email: email,
        otp: otp,
      });
      if (!deletedOtp) {
        throw new Error("otp delete failed");
      }
      console.log("otp deleted by email and otp");
      return "deleted otp by email and otp";
    }
    throw new Error("Either type or otp must be provided");
  }
}
