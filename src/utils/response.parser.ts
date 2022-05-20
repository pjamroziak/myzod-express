import { Options } from '../types';
import { ValidationError } from 'myzod';
import { ParsedResponse } from '../types/common';

const parseResponse = (error: ValidationError, options?: Options): ParsedResponse => {
  let responseObject: unknown = error;
  let statusCode: number = 400;

  if (options) {
    if (options.defaultResponseCode) {
      statusCode = options.defaultResponseCode;
    }
    if (options.defaultResponseFunc) {
      responseObject = options.defaultResponseFunc(error);
    }
  }

  return {
    statusCode,
    responseObject
  }
}

export default parseResponse;