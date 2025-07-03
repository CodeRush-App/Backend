import { loginSchema } from '../../src/validators/auth.validator';

describe('loginSchema', () => {
    it('should validate a valid email and password', () => {
        const data = { email: 'test@example.com', password: 'password123' };
        const { error } = loginSchema.validate(data);
        expect(error).toBeUndefined();
    });

    it('should fail for invalid email', () => {
        const data = { email: 'not-an-email', password: 'password123' };
        const { error } = loginSchema.validate(data);
        expect(error).toBeDefined();
    });

    it('should fail for short password', () => {
        const data = { email: 'test@example.com', password: 'short' };
        const { error } = loginSchema.validate(data);
        expect(error).toBeDefined();
    });
});
