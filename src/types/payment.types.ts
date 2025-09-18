import mongoose from "mongoose";

export interface PaymentDocument extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  amount: number;
  transactionId: string;
  residentId: mongoose.Types.ObjectId;
  ownerId: mongoose.Types.ObjectId;
  title: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface paymentFilter {
  residentId?: string;
  ownerId?: string;
  title?: string;
}
