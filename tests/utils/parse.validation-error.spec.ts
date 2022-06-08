import { ValidationError } from 'myzod';
import { Options } from '@src/types/common.type';
import parseValidationError from '@src/utils/parse.validation-error';
import ValidationErrorMock from '../mocks/validation-error.mock';

describe('parseValidationError', () => {
  test('return ValidationError', () => {
    const validResponse: ValidationError = {
      name: 'ValidationErrorMock_Name',
      path: ['ValidationErrorMock_Path'],
      message: 'ValidationErrorMock_Message',
    };

    const validationError: ValidationError = ValidationErrorMock.create({});
    
    expect(validResponse).toStrictEqual(parseValidationError(validationError));
  });

  test('return parsed object by custom function', () => {
    const validResponse: ValidationError = {
      name: 'ValidationErrorMock_Name',
      message: 'ValidationErrorMock_Message',
    };

    const validationError: ValidationError = ValidationErrorMock.create({});
    
    const options: Options = {
      defaultResponseFunc: (validationError) => {
        return {
          name: validationError.name,
          message: validationError.message,
        };
      },
    };
    
    expect(validResponse).toStrictEqual(parseValidationError(validationError, options));
  });
});
