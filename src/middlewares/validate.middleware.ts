import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'myzod';
import { MyZodSchema, Options } from '../types';
import { RequestField } from '../types/common';
import parseResponse from '../utils/response.parser';

const validateMiddleware = (requestField: RequestField, schema: MyZodSchema, options?: Options) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req[requestField], options?.myzodOptions);
      next();
    } catch (err: unknown) {
      const { statusCode, responseObject } = parseResponse(err as ValidationError, options);
      res.status(statusCode).send(responseObject);
      next(err);
    }
  };
};

export default validateMiddleware;
