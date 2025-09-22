import { OtpDocument } from "../types/otp.types";
import mongoose, { model } from "mongoose";


const otpSchema = new mongoose.Schema<OtpDocument>(
    {
        otp: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
            enum: ["resetPassword", "register"],
        },
        email: {
            type: String,
            required: true,
        },
        
        expiresAt: {
            type: Date,
            required: true,
            default: () => new Date(Date.now() + 10 * 60 * 1000), // 10 minutes from now
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: false,
        },
    },
    { timestamps: true }
);

const OtpModel = model<OtpDocument>("Otp", otpSchema);

export default OtpModel;