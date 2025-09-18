import { LeaseServices } from "../services/leaseServices";
import {
    createLeaseParams,
    LeaseFilterI,
    updateLeaseParams,
} from "../types/lease.types";

export class LeaseController {
    async registerLeaseController({
        buildingId,
        tenantId,
        moveIn,
    }: createLeaseParams) {
        const service = new LeaseServices();
        const crrentlyOnLease = false;
        if (crrentlyOnLease) {
            throw new Error("already in a lease");
        }
        const lease = await service.createLease({
            buildingId,
            tenantId,
            moveIn,
        });
        return lease;
    }

    async updateLeaseController(leaseId: string, params: updateLeaseParams) {
        const service = new LeaseServices();
        // need to check if the user id is the same as the tenant id
        const lease = await service.update(leaseId, params);
        return lease;
    }

    async getLeaseByIdController(leaseId: string) {
        const service = new LeaseServices();
        const lease = await service.getOne(leaseId);
        return lease;
    }

    async deleteController(leaseId: string) {
        const service = new LeaseServices();
        // need to check if the user id is the same as the tenant id
        const lease = await service.delete(leaseId);
        return lease;
    }

    async getAllLeaseController(
        pageNo: number,
        limit: number,
        filter: LeaseFilterI,
        sort?: string
    ) {
        const service = new LeaseServices();
        // need to check if the user id is the same as the tenant id
        const leases = await service.getAll(pageNo, limit, filter, sort);
        return leases;
    }
    async setMoveOutRequestController(leaseId: string, moveOutRequest: Date) {
        const service = new LeaseServices();
        const lease = await service.setMoveOutRequest(leaseId, moveOutRequest);
        return lease;
    }
    async approveMoveOutRequestController(
        leaseId: string,
        requestStatus: string
    ) {
        const service = new LeaseServices();
        const lease = await service.approvalRequest(leaseId, requestStatus);
        return lease;
    }
    async getCurrentLeaseController(tenantId: string) {
        const service = new LeaseServices();
        // need to check if the user id is the same as the tenant id
        const lease = await service.getCurrentLease(tenantId);
        return lease;
    }
}