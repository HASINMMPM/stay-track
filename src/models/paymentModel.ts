import { PaymentDocument } from "../types/payment.types";
import mongoose, { Document, model, Schema } from "mongoose";

const paymentSchema = new Schema<PaymentDocument>(
  {
    
    amount: {
      type: Number,
      required: true,
    },

    transactionId: {
      type: String,
      required: true,
      unique: true,
    },
    residentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const PaymentModel = model<PaymentDocument>("Payment", paymentSchema);

export default PaymentModel;
