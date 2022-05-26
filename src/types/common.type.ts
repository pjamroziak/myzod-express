import { ObjectType } from 'myzod';
import { ObjectOptions, ObjectShape, PathOptions, ValidationError } from 'myzod/libs/types';

export type MyZodSchema = ObjectType<ObjectShape>;
export type MyZodOptions = ObjectOptions<ObjectShape> & PathOptions;

export type Options = {
  defaultResponseCode?: number;
  defaultResponseFunc?: (error: ValidationError) => unknown;
  myzodOptions?: MyZodOptions;
};
