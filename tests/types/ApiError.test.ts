import ApiError from '../../src/types/ApiError';

describe('ApiError', () => {
    it('should set statusCode and message', () => {
        const err = new ApiError(404, 'Not found');
        expect(err.statusCode).toBe(404);
        expect(err.message).toBe('Not found');
        expect(err).toBeInstanceOf(Error);
    });

    it('should capture stack trace', () => {
        const err = new ApiError(500, 'Server error');
        expect(err.stack).toBeDefined();
    });
});
