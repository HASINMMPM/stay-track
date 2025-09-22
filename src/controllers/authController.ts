import { AuthUtils } from "../utils/auth";
import { AuthServices } from "../services/authServices";
import { sendEmail } from "../utils/nodeMailer";
import { generateOTPEmailTemplate } from "../utils/emailTemplates";

export class AuthController {
  async registration(
    name: string,
    email: string,
    password: string,
    mobileNumber: string,
    role: string,
    otp: string
  ) {
    const authServices = new AuthServices();
    const user = await authServices.registration(
      name,
      email,
      password,
      mobileNumber,
      role,
      otp
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
  async sendOtp(email: string, type: string, mobileNumber: string) {
    console.log("params in controller ✅", email, type, mobileNumber);
    const authServices = new AuthServices();
    const generateOtp = Math.floor(100000 + Math.random() * 900000);
    const otp = await authServices.sendOtp(email, type, generateOtp, mobileNumber);
    
    if (otp) {
      // Generate beautiful email template
      const emailTemplate = generateOTPEmailTemplate({
        otp: generateOtp.toString(),
        type: type,
        userName: email.split('@')[0], // Extract username from email
        expiryMinutes: 10
      });

      // Send email with beautiful template
      const emailResult = await sendEmail(
        email,
        `StayTrack - ${type} Verification Code`,
        emailTemplate.text,
        emailTemplate.html
      );

      if (emailResult.success) {
        return { success: true, message: "OTP sent successfully" };
      } else {
        console.error("Email sending failed:", emailResult.error);
        return { success: false, message: "OTP sending failed" };
      }
    } else {
      return { success: false, message: "OTP sending failed" };
    }
  }
}
