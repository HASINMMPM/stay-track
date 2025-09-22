import { BuildingDocument } from "../types/building.types";
import mongoose from "mongoose";

const buildingSchema = new mongoose.Schema<BuildingDocument>(
    {
        name: {
            type: String,
            required: true,
        },
        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        local: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        thaluk: {
            type: String,
            required: true,
        },
        district: {
            type: String,
            required: true,
        },
        lat: {
            type: String,
            required: true,
        },
        long: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
        },
    },
    { timestamps: true }
);

const BuildingModle = mongoose.model<BuildingDocument>(
    "Building",
    buildingSchema
);
export default BuildingModle;