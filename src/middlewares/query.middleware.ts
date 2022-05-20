import { MyZodSchema, Options } from '../types';
import validateMiddleware from './validate.middleware';

export const validateQueryParams = (schema: MyZodSchema, options?: Options) => {
  return validateMiddleware('query', schema, options);
};
