import { MyZodSchema, Options } from '../types';
import validateMiddleware from './validate.middleware';

export const validateBody = (schema: MyZodSchema, options?: Options) => {
  return validateMiddleware('body', schema, options);
};
