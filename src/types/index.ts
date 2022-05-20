import { ObjectType } from 'myzod';
import { ObjectOptions, PathOptions, ValidationError } from 'myzod/libs/types';

type MyZodSchema = ObjectType<any>; 
type MyZodOptions = ObjectOptions<any> & PathOptions

type Options = {
  defaultResponseCode?: number,
  defaultResponseFunc?: (error: ValidationError) => unknown,
  myzodOptions?: MyZodOptions,
};

export {
  MyZodOptions,
  MyZodSchema,
  Options,
};