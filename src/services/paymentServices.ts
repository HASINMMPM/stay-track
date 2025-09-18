import { paymentFilter } from "@/types/payment.types";
import PaymentModel from "../models/paymentModel";
// import { paymentFilter } from "../routes/paymentRouter.ts";

class PaymentService {
  async createPayment(
    amount: number,
    residentId: string,
    ownerId: string,
    title: string,
    transactionId: string
  ) {
    
    const payment = PaymentModel.create({
      amount,
      transactionId,
      residentId,
      ownerId,
      title,
    });
    if (!payment) {
      throw new Error("cannot create payment right now");
    }
    return payment;
  }
  async deletePayment(paymentId: string) {
    const payment = await PaymentModel.findOneAndDelete({ _id: paymentId });
    if (!payment) {
      throw new Error("payment not found");
    }
    return payment;
  }
  async getSinglePayment(paymentId: string) {
      const payment = await PaymentModel.findOne({ _id: paymentId });
      if (!payment) {
          throw new Error("payment not found");
      }
      return payment;
  }
  async getAllPayments(
      pageNo: number,
      limit: number,
      filter: paymentFilter,
      sort?: string
  ) {
      const skip = (pageNo - 1) * limit;

      const query = Object.fromEntries(
          Object.entries(filter).filter(([_, v]) => v !== undefined)
      );
      const payments = await PaymentModel.find(query)
          .skip(skip)
          .limit(limit)
          .sort(sort);
      if (!payments) {
          throw new Error("No payments found");
      }
      const total = await PaymentModel.countDocuments(query);
      const totalPages = Math.ceil(total / limit);
      const hasNextPage = pageNo < totalPages ? true : false;
      const hasPrevPage = pageNo > 1 ? true : false;
      return {
          doc: payments,
          totalDocs: total,
          totalPages,
          limit,
          page: pageNo,
          hasNextPage,
          hasPrevPage,
      };
  }
}
export default PaymentService;
