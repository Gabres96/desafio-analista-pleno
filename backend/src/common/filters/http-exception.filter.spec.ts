import { HttpException, HttpStatus } from '@nestjs/common';
import { HttpExceptionFilter } from './http-exception.filter';

const makeHost = (url: string) => {
  const json = jest.fn();
  const status = jest.fn().mockReturnValue({ json });
  const res = { status };
  const req = { url };

  return {
    host: {
      switchToHttp: () => ({
        getResponse: () => res,
        getRequest: () => req,
      }),
    } as never,
    res,
    json,
    status,
  };
};

describe('HttpExceptionFilter', () => {
  let filter: HttpExceptionFilter;

  beforeEach(() => {
    filter = new HttpExceptionFilter();
  });

  it('should return correct JSON structure for a 404 error', () => {
    const exception = new HttpException('Not Found', HttpStatus.NOT_FOUND);
    const { host, status, json } = makeHost('/velorios/99');

    filter.catch(exception, host);

    expect(status).toHaveBeenCalledWith(404);
    expect(json).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: 404,
        message: 'Not Found',
        path: '/velorios/99',
      }),
    );
  });

  it('should return correct JSON structure for a 400 error', () => {
    const exception = new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    const { host, status, json } = makeHost('/velorios');

    filter.catch(exception, host);

    expect(status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: 400,
        message: 'Bad Request',
        path: '/velorios',
      }),
    );
  });

  it('should include a timestamp in ISO format', () => {
    const exception = new HttpException(
      'Error',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
    const { host, json } = makeHost('/test');

    filter.catch(exception, host);

    const payload = (json as jest.Mock).mock.calls[0][0];
    expect(payload.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
  });

  it('should extract message array from validation error response', () => {
    const exception = new HttpException(
      { message: ['field is required'], error: 'Bad Request' },
      HttpStatus.BAD_REQUEST,
    );
    const { host, json } = makeHost('/velorios');

    filter.catch(exception, host);

    const payload = (json as jest.Mock).mock.calls[0][0];
    expect(payload.message).toEqual(['field is required']);
  });
});
