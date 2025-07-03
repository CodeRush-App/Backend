import { createCompanySchema, updateCompanySchema } from '../../src/validators/companies.validator';

describe('companies.validator', () => {
    describe('createCompanySchema', () => {
        it('should validate a valid company creation', () => {
            const data = {
                username: 'manager',
                email: 'manager@company.com',
                password: 'securepass123',
                companyName: 'Test Company',
            };
            const { error } = createCompanySchema.validate(data);
            expect(error).toBeUndefined();
        });

        it('should fail for missing companyName', () => {
            const data = {
                username: 'manager',
                email: 'manager@company.com',
                password: 'securepass123',
            };
            const { error } = createCompanySchema.validate(data);
            expect(error).toBeDefined();
        });
    });

    describe('updateCompanySchema', () => {
        it('should allow partial update', () => {
            const data = { name: 'New Name' };
            const { error } = updateCompanySchema.validate(data);
            expect(error).toBeUndefined();
        });
    });
});
