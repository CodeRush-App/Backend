import { createUserSchema, updateUserSchema } from '../../src/validators/user.validator';

describe('user.validator', () => {
    describe('createUserSchema', () => {
        it('should validate a valid user', () => {
            const data = {
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123',
                provider: 'credentials',
            };
            const { error } = createUserSchema.validate(data);
            expect(error).toBeUndefined();
        });

        it('should fail for missing password', () => {
            const data = {
                username: 'testuser',
                email: 'test@example.com',
                provider: 'credentials',
            };
            const { error } = createUserSchema.validate(data);
            expect(error).toBeDefined();
        });
    });

    describe('updateUserSchema', () => {
        it('should allow partial update', () => {
            const data = { username: 'newname' };
            const { error } = updateUserSchema.validate(data);
            expect(error).toBeUndefined();
        });

        it('should fail for forbidden email update', () => {
            const data = { email: 'new@example.com' };
            const { error } = updateUserSchema.validate(data);
            expect(error).toBeDefined();
        });
    });
});
