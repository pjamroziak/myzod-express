export type RequestField = 'params' | 'query' | 'body';
export type ParsedResponse = {
  statusCode: number,
  responseObject: unknown,
};
