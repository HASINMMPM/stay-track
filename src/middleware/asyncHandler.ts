import { Request, Response, NextFunction } from 'express';

// Type for async route handler function
type AsyncRouteHandler = (req: Request, res: Response, next: NextFunction) => Promise<any>;

// Async wrapper function to catch errors in route handlers
export const asyncHandler = (fn: AsyncRouteHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
