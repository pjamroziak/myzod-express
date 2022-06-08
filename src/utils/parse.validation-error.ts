import { Options } from '../types/common.type';
import { ValidationError } from 'myzod';

const parseValidationError = (error: ValidationError, options?: Options): unknown => {
  let parsedValidationError: unknown;

  if (options?.defaultResponseFunc) {
    parsedValidationError = options.defaultResponseFunc(error);
  }

  return parsedValidationError ?? error;
};

export default parseValidationError;
