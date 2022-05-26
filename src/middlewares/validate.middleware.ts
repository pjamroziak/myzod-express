import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'myzod';
import { MyZodSchema, Options } from '../types/common.type';
import { RequestField } from '../types/middleware.type';
import parseResponse from '../utils/response.parser';

const validateMiddleware = (requestField: RequestField, schema: MyZodSchema, options?: Options) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req[requestField], options?.myzodOptions);
      next();
    } catch (err: unknown) {
      if (err instanceof ValidationError) {
        const { statusCode, responseObject } = parseResponse(err as ValidationError, options);
        res.status(statusCode).send(responseObject);
      }

      next(err);
    }
  };
};

export default validateMiddleware;
