import { Options } from '../types/common.type';
import { ValidationError } from 'myzod';
import { ParsedResponse } from '../types/middleware.type';

const parseResponse = (error: ValidationError, options?: Options): ParsedResponse => {
  let responseObject: unknown;
  let statusCode = 400;

  if (options) {
    if (options.defaultResponseCode) {
      statusCode = options.defaultResponseCode;
    }
    if (options.defaultResponseFunc) {
      responseObject = options.defaultResponseFunc(error);
    }
  }

  responseObject = responseObject ?? JSON.stringify(error);

  return {
    statusCode,
    responseObject,
  };
};

export default parseResponse;
