import { catchAsync } from '../../src/utils/catchAsync';

describe('catchAsync', () => {
    it('should call the async function and pass req, res, next', async () => {
        const req = {} as any;
        const res = {} as any;
        const next = jest.fn();
        const handler = jest.fn(async () => 'ok');
        const wrapped = catchAsync(handler);
        await wrapped(req, res, next);
        expect(handler).toHaveBeenCalledWith(req, res, next);
        expect(next).not.toHaveBeenCalledWith(expect.any(Error));
    });

    it('should catch errors and call next with error', async () => {
        const req = {} as any;
        const res = {} as any;
        const next = jest.fn();
        const error = new Error('fail');
        const handler = jest.fn(async () => { throw error; });
        const wrapped = catchAsync(handler);
        await wrapped(req, res, next);
        expect(next).toHaveBeenCalledWith(error);
    });
});
