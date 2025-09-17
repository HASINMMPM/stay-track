import { Request, Response, NextFunction } from 'express';
import Joi, { ObjectSchema } from 'joi';

export const validate = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const options: Joi.ValidationOptions = {
      abortEarly: false,
      allowUnknown: false,
      stripUnknown: true
    };

    const { error, value } = schema.validate(req.body, options);

    if (error) {
      res.status(400).json({
        success: false,
        message: 'Validation error',
        details: error.details.map((d) => ({
          message: d.message,
          path: d.path
        }))
      });
      return;
    }

    req.body = value;
    next();
  };
};

