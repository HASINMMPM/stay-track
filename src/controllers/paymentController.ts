import PaymentService from "../services/paymentServices";
import { paymentFilter } from "../types/payment.types";

export class PaymentController {
    async createPayment(
        amount: number,
        residentId: string,
        ownerId: string,
        title: string
      ){
        const transactionId = `ST-${Date.now()}-${Math.random()
            .toString(36)
            .substring(2, 8)
            .toUpperCase()}`;
            console.log("transactionId", Date.now());
        const paymentService = new PaymentService();
        const payment = paymentService.createPayment(
            amount,
            residentId,
            ownerId,
            title,
            transactionId
        );
        return payment;
      }
    async getaPaymentId(paymentId: string) {
        const paymentService = new PaymentService();
        const payment = paymentService.getSinglePayment(paymentId);
        return payment;
    }
    async getAllPayments(
        pageNo: number,
        limit: number,
        filter: paymentFilter,
        sort?: string
    ) {
        const paymentService = new PaymentService();
        const payments = await paymentService.getAllPayments(
            pageNo,
            limit,
            filter,
            sort
        );
        return payments;
    }
    async deletePayment(paymentId: string) {
        const paymentService = new PaymentService();
        const payment = await paymentService.deletePayment(paymentId);
        return payment;
    }
}