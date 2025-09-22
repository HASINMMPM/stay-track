import mongoose from "mongoose";

export interface OtpDocument extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    otp: string;
    type: string;
    email: string;
    expiresAt: Date;
    userId?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateOtpParams {
    otp: string;
    type: string;
    email?: string;
    userId?: string;
    expiresAt?: Date;
}