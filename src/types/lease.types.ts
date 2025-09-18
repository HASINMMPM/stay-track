import mongoose from "mongoose";

export interface LeaseDocument extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    buildingId: mongoose.Types.ObjectId;
    tenantId: mongoose.Types.ObjectId;
    moveIn: Date;
    moveOut: Date;
    requestStatus: string;
    moveOutRequest?: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface createLeaseParams {
    buildingId: string;
    tenantId: string;
    moveIn?: Date;
    moveOut?: Date;
    ownerId: string;
}

export interface updateLeaseParams {
    status?: string;
    moveIn?: Date;
    moveOut?: Date;
}

export interface LeaseFilterI {
    buildingId?: string;
    tenantId?: string | null;
    status?: string;
    moveIn?: Date;
    moveOut?: Date;
}