import { ValidationError } from 'myzod';

export type RequestField = 'params' | 'query' | 'body';
export type ParsedResponse = {
  statusCode: number,
  responseObject: unknown,
};
export class MyZodError extends ValidationError {
  constructor(message: string, path?: (string | number)[] | undefined, collectedErrors?: Record<string, ValidationError | undefined> | undefined) {
    super(message, path, collectedErrors);
  }
}