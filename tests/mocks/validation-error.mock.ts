import { ValidationError } from 'myzod';

abstract class ValidationErrorMock {
  static create(partial: Partial<ValidationError>): ValidationError {
    const validationError = {
      name: 'ValidationErrorMock_Name',
      path: ['ValidationErrorMock_Path'],
      message: 'ValidationErrorMock_Message',
    } as unknown as ValidationError;

    return {
      ...validationError,
      ...partial
    };
  }
}

export default ValidationErrorMock;
