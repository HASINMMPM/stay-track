import LeaseModel from "../models/leaseModel";
import {
  createLeaseParams,
  LeaseFilterI,
  updateLeaseParams,
} from "../types/lease.types";

export class LeaseServices {
  async createLease(params: createLeaseParams) {
    const isCurrentlyOnLease = await this.getCurrentLease(params.tenantId);
    console.log("is corrently on lease", isCurrentlyOnLease);
    if (isCurrentlyOnLease || isCurrentlyOnLease !== null) {
      throw new Error("You are already in a lease please leave from there");
    }
    const lease = await LeaseModel.create(params);
    return lease;
  }

  async update(leaseId: string, params: updateLeaseParams) {
    const lease = await LeaseModel.findByIdAndUpdate(leaseId, params, {
      new: true,
    });
    if (!lease) {
      throw new Error("Lease not found");
    }
    return lease;
  }

  async delete(leaseId: string) {
    const lease = await LeaseModel.findByIdAndDelete(leaseId);
    if (!lease) {
      throw new Error("Lease not found");
    }
    return lease;
  }

  async isExist(leaseId: string) {
    const exist = await LeaseModel.exists({ _id: leaseId });
    if (!exist) {
      throw new Error("Lease not found");
    }
    return true;
  }

  async getAll(
    pageNo: number,
    limit: number,
    fitlers: LeaseFilterI,
    sort: string = "createdAt"
  ) {
    const skip = (pageNo - 1) * limit;

    const query = Object.fromEntries(
      Object.entries(fitlers).filter(([_, v]) => v !== undefined)
    );

    const leases = await LeaseModel.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit);
    const total = await LeaseModel.countDocuments(query);

    const totalPages = Math.ceil(total / limit);
    const hasNextPage = pageNo < totalPages ? true : false;
    const hasPrevPage = pageNo > 1 ? true : false;
    return {
      doc: leases,
      totalDocs: total,
      totalPages,
      limit,
      page: pageNo,
      hasNextPage,
      hasPrevPage,
    };
  }

  async getOne(leaseId: String) {
    const lease = await LeaseModel.findById(leaseId);
    if (!lease) {
      throw new Error("Lease not found");
    }
    return lease;
  }
  async setMoveOutRequest(leaseId: string, moveOutRequest: Date) {
    const isExist = await this.isExist(leaseId);
    if (!isExist) {
      throw new Error("Lease not found");
    }
    const isAlreadyMoveOut = await LeaseModel.findOne({
      _id: leaseId,
      moveOut: { $exists: true, $ne: null },
    });
    if (isAlreadyMoveOut) {
      throw new Error("Move out already done");
    }
    const lease = await LeaseModel.findByIdAndUpdate(
      leaseId,
      { moveOutRequest, requestStatus: "pending" },
      { new: true }
    );
    if (!lease) {
      throw new Error("Lease not found");
    }
    return lease;
  }
  async approvalRequest(leaseId: string, requestStatus: string) {
    console.log("approve move out request", leaseId, requestStatus);
    const isExist = await this.isExist(leaseId);
    if (!isExist) {
      throw new Error("Lease not found");
    }
    // check moveOutRequest is set
    const isRequested = await LeaseModel.findOne({
      _id: leaseId,
      moveOutRequest: { $exists: true, $ne: null },
    });
    if (!isRequested) {
      throw new Error("Move out request not found for approval");
    }
    const moveOutRequest = isRequested.moveOutRequest;
    const lease = await LeaseModel.findByIdAndUpdate(
      leaseId,
      { requestStatus, moveOut: moveOutRequest },
      { new: true }
    );
    if (!lease) {
      throw new Error("Lease not found");
    }
    return lease;
  }
  async getCurrentLease(tenantId: string) {
    const lease = await LeaseModel.findOne({
      tenantId: tenantId,
      requestStatus: { $in: [undefined, "pending"] },
      $or: [{ moveOut: { $gt: new Date() } }, { moveOut: { $eq: null } }],
      moveIn: { $lte: new Date() },
    });

    return lease;
  }

  // [TODO]: Implement permision handling
  // async hasPermision(userId: string, buildingId: string) {}
}
