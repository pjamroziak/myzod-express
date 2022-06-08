import { Request, Response, NextFunction, RequestHandler } from 'express';
import myzod, { ValidationError } from 'myzod';
import {validateRequest} from '@src/middlewares/validate.middleware';
import { Options, RequestField } from '@src/types/common.type';

describe('validateRequest', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      statusCode: 200,
      status: jest.fn(),
      send: jest.fn()
    };
    nextFunction = jest.fn();
  });

  test('throw error when field is not exist in the request', () => {
    const schema = myzod.object({
      id: myzod.number(),
      name: myzod.string(),
    });

    const middleware: RequestHandler = validateRequest('test' as RequestField, schema);
    middleware(mockRequest as Request, mockResponse as Response, nextFunction);

    expect('function').toEqual(typeof middleware);
    expect(nextFunction).toHaveBeenCalledWith(new Error('field "test" is not exist in request'));
  });
  
  test('validate request body by provided schema', () => {
    const schema = myzod.object({
      id: myzod.number(),
      name: myzod.string(),
    });

    mockRequest = {
      body: {
        id: 1,
        name: 'test'
      }
    };

    const middleware: RequestHandler = validateRequest('body', schema);
    middleware(mockRequest as Request, mockResponse as Response, nextFunction);

    expect('function').toEqual(typeof middleware);
    expect(nextFunction).toHaveBeenCalledWith();
  });

  test('validate request query params by provided schema', () => {
    const schema = myzod.object({
      id: myzod.string(),
      name: myzod.string(),
    });

    mockRequest = {
      query: {
        id: '1',
        name: 'test'
      }
    };

    const middleware: RequestHandler = validateRequest('query', schema);
    middleware(mockRequest as Request, mockResponse as Response, nextFunction);

    expect('function').toEqual(typeof middleware);
    expect(nextFunction).toHaveBeenCalledWith();
  });

  test('validate request params by provided schema', () => {
    const schema = myzod.object({
      id: myzod.string(),
      name: myzod.string(),
    });

    mockRequest = {
      params: {
        id: '1',
        name: 'test'
      }
    };

    const middleware: RequestHandler = validateRequest('params', schema);
    middleware(mockRequest as Request, mockResponse as Response, nextFunction);

    expect('function').toEqual(typeof middleware);
    expect(nextFunction).toHaveBeenCalledWith();
  });

  test('pass validation error to nextFunction', () => {
    const schema = myzod.object({
      id: myzod.number(),
      count: myzod.number(),
    });

    mockRequest = {
      body: {
        id: 1,
        count: 'test'
      }
    };

    const middleware: RequestHandler = validateRequest('body', schema);
    middleware(mockRequest as Request, mockResponse as Response, nextFunction);

    expect('function').toEqual(typeof middleware);
    expect(nextFunction).toHaveBeenCalledWith(new ValidationError('error parsing object at path: "count" - expected type to be number but got string'));
  });

  test('pass validation error to response.send function', () => {
    const schema = myzod.object({
      id: myzod.number(),
      count: myzod.number(),
    });

    mockRequest = {
      body: {
        id: 1,
        count: 'test'
      }
    };

    const middleware: RequestHandler = validateRequest('body', schema, { createAndReturnResponse: true });
    middleware(mockRequest as Request, mockResponse as Response, nextFunction);

    expect('function').toEqual(typeof middleware);
    expect(mockResponse.send).toHaveBeenCalledWith(new ValidationError('error parsing object at path: "count" - expected type to be number but got string'));
  });

  test('pass custom object to response.send function', () => {
    const schema = myzod.object({
      id: myzod.number(),
      count: myzod.number(),
    });

    mockRequest = {
      body: {
        id: 1,
        count: 'test'
      }
    };
    const options: Options = {
      createAndReturnResponse: true,
      defaultResponseFunc: (error: ValidationError) => {
        return {
          result: error.message,
        };
      }
    };

    const middleware: RequestHandler = validateRequest('body', schema, options);
    middleware(mockRequest as Request, mockResponse as Response, nextFunction);

    expect('function').toEqual(typeof middleware);
    expect(mockResponse.send).toHaveBeenCalledWith({ result: 'error parsing object at path: "count" - expected type to be number but got string' });
  });

  test('pass custom object and custom status code', () => {
    const schema = myzod.object({
      id: myzod.number(),
      count: myzod.number(),
    });

    mockRequest = {
      body: {
        id: 1,
        count: 'test'
      }
    };
    const options: Options = {
      createAndReturnResponse: true,
      defaultResponseCode: 400,
      defaultResponseFunc: (error: ValidationError) => {
        return {
          result: error.message,
        };
      }
    };

    const middleware: RequestHandler = validateRequest('body', schema, options);
    middleware(mockRequest as Request, mockResponse as Response, nextFunction);

    expect('function').toEqual(typeof middleware);
    expect(mockResponse.send).toHaveBeenCalledWith({ result: 'error parsing object at path: "count" - expected type to be number but got string' });
    expect(mockResponse.status).toHaveBeenCalledWith(400);
  });
});
