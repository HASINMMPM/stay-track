import mongoose from "mongoose";

export interface BuildingDocument extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    ownerId: mongoose.Types.ObjectId;
    city: string;
    local: string;
    thaluk: string;
    district: string;
    state: string;
    lat: string;
    long: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface createBuildingParams {
    ownerId: string;
    name: string;
    local: string;
    city: string;
    thaluk: string;
    district: string;
    state: string;
    lat: string;
    long: string;
}

export interface updateBuildingParams {
    name?: string;
    local?: string;
    city?: string;
    thaluk?: string;
    district?: string;
    state?: string;
    lat?: string;
    long?: string;
}

export interface BuildingFilter {
    ownerId?: string;
    name?: string;
    local?: string;
    city?: string;
    thaluk?: string;
    district?: string;
    state?: string;
    status?: string;
    lat?: string;
    long?: string;
}