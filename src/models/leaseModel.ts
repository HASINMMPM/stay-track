import mongoose from "mongoose";
import { LeaseDocument } from "../types/lease.types";

const leaseSchema = new mongoose.Schema<LeaseDocument>(
    {
        buildingId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Building",
            required: true,
        },
        tenantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        moveIn: {
            type: Date,
        },
        moveOut: {
            type: Date,
        },
        requestStatus: {
            type: String,
            enum: ["pending", "rejected", "approved", "auto-approved"],
        },
        moveOutRequest: { type: Date },
    },
    { timestamps: true }
);

const LeaseModel = mongoose.model<LeaseDocument>("Lease", leaseSchema);
export default LeaseModel;