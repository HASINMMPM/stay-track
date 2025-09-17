import mongoose, { Document, model, Schema } from "mongoose";
import { IUser } from "../types/authTypes";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobileNumber: { type: String, required: true, unique: true },
    role: {
      type: String,
      enum: ["admin", "user","owner"],
      default: "user",
      required: true
    },
    password: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = model<IUser>("User", userSchema);

export default UserModel;
