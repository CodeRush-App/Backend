import { createSubmissionSchema, updateSubmissionSchema } from '../../src/validators/submissions.validator';

describe('submissions.validator', () => {
    describe('createSubmissionSchema', () => {
        it('should validate a valid submission', () => {
            const data = {
                userId: 'user1',
                problemId: 'prob1',
                result: 'Accepted',
                language: 'typescript',
                calculationTimeMs: 100,
                complexity: 'O(1)',
                memoryUsageKb: 512,
                code: 'console.log(1);',
            };
            const { error } = createSubmissionSchema.validate(data, { allowUnknown: true });
            expect(error).toBeUndefined();
        });

        it('should fail for missing required fields', () => {
            const data = { userId: 'user1' };
            const { error } = createSubmissionSchema.validate(data);
            expect(error).toBeDefined();
        });
    });

    describe('updateSubmissionSchema', () => {
        it('should allow partial update', () => {
            const data = { result: 'Accepted' };
            const { error } = updateSubmissionSchema.validate(data);
            expect(error).toBeUndefined();
        });

        it('should fail for forbidden userId update', () => {
            const data = { userId: 'user2' };
            const { error } = updateSubmissionSchema.validate(data);
            expect(error).toBeDefined();
        });
    });
});
