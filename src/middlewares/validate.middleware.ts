import parseValidationError from '@src/utils/parse.validation-error';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { ValidationError } from 'myzod';
import { MyZodOptions, MyZodSchema, Options, RequestField } from '../types/common.type';

const validate = (object: unknown, schema: MyZodSchema, options?: MyZodOptions): ValidationError | null => {
  try {
    schema.parse(object, options);
  } catch (err: unknown) {
    if (err instanceof ValidationError) {
      return err;
    }
  }

  return null;
};

export const validateRequest = (field: RequestField, schema: MyZodSchema, options?: Options): RequestHandler => {
  return (request: Request, response: Response, next: NextFunction) => {
    if (!(field in request)) {
      return next(new Error(`field "${field}" is not exist in request`));
    }

    const validationResult = validate(request[field], schema, options?.myzodOptions);
    if (!validationResult) {
      return next();
    }

    if (options?.createAndReturnResponse) {
      const parsedValidationError = parseValidationError(validationResult, options);
      return prepareResponse(parsedValidationError, response, options);
    }

    return next(validationResult);
  };
};

const prepareResponse = (objectToSend: unknown, response: Response, options?: Options): Response => {
  if (options?.defaultResponseCode) {
    response.status(options.defaultResponseCode);
  }
  
  return response.send(objectToSend);
};
