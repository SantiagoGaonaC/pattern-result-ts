// result.test.ts

import { Result, ResultObject } from "../src/index"

describe('Result Class Tests', () => {
  it('should create a success Result', () => {
    const successResult = Result.success<string>('Data');
    
    expect(successResult.isSuccess).toBe(true);
    expect(successResult.value).toBe('Data');
    expect(successResult.error).toBe('');
    expect(successResult.statusCode).toBe(200);
  });

  it('should create a failure Result', () => {
    const failureResult = Result.failure<string>('Error message');
    
    expect(failureResult.isSuccess).toBe(false);
    expect(failureResult.value).toBeUndefined();
    expect(failureResult.error).toBe('Error message');
    expect(failureResult.statusCode).toBe(400);
  });

  it('should convert Result to Object', () => {
    const result = Result.success<string>('Data', 201);
    const resultObject: ResultObject<string> = result.toObject();
    
    expect(resultObject.isSuccess).toBe(true);
    expect(resultObject.value).toBe('Data');
    expect(resultObject.error).toBe('');
    expect(resultObject.statusCode).toBe(201);
  });

  it('should create Result from Object', () => {
    const resultObject: ResultObject<number> = {
      isSuccess: true,
      value: 123,
      error: '',
      statusCode: 200
    };

    const result = Result.fromObject(resultObject);
    
    expect(result.isSuccess).toBe(true);
    expect(result.value).toBe(123);
    expect(result.error).toBe('');
    expect(result.statusCode).toBe(200);
  });
});
