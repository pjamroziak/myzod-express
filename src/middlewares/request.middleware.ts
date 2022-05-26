import { MyZodSchema, Options } from '../types/common.type';
import validateMiddleware from './validate.middleware';

export const validateBody = (schema: MyZodSchema, options?: Options) => {
  return validateMiddleware('body', schema, options);
};

export const validateQueryParams = (schema: MyZodSchema, options?: Options) => {
  return validateMiddleware('query', schema, options);
};

export const validateParams = (schema: MyZodSchema, options?: Options) => {
  return validateMiddleware('params', schema, options);
};
