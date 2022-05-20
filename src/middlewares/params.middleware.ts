import { MyZodSchema, Options } from '../types';
import validateMiddleware from './validate.middleware';

export const validateParams = (schema: MyZodSchema, options?: Options) => {
  return validateMiddleware('params', schema, options);
}
