import { ObjectType } from 'myzod';
import { ObjectOptions, PathOptions, ValidationError } from 'myzod/libs/types';

export type RequestField = 'params' | 'query' | 'body';

export type MyZodSchema = ObjectType<any>;
export type MyZodOptions = ObjectOptions<any> & PathOptions;

export type Options = {
  defaultResponseCode?: number;
  defaultResponseFunc?: (error: ValidationError) => unknown;
  createAndReturnResponse?: boolean;
  myzodOptions?: MyZodOptions;
};
