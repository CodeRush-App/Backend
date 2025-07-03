import { createProblemSchema, updateProblemSchema } from '../../src/validators/problems.validator';

describe('problems.validator', () => {
    describe('createProblemSchema', () => {
        it('should validate a valid problem', () => {
            const data = {
                title: 'Sum Numbers',
                slug: 'sum-numbers',
                difficulty: 'Easy',
                topic: 'Math',
                tags: ['math', 'sum'],
                description: 'Add two numbers.',
                function: {
                    name: 'sum',
                    parameters: [
                        { name: 'a', type: 'number', description: 'First number' },
                        { name: 'b', type: 'number', description: 'Second number' },
                    ],
                    return: { type: 'number', description: 'Sum of a and b' },
                },
                constraints: ['a >= 0', 'b >= 0'],
                examples: [
                    { input: [1, 2], output: 3, explanation: '1 + 2 = 3' },
                ],
                testCases: [
                    { input: [1, 2], expectedOutput: 3 },
                ],
            };
            const { error } = createProblemSchema.validate(data);
            expect(error).toBeUndefined();
        });

        it('should fail for missing required fields', () => {
            const data = { title: 'Sum Numbers' };
            const { error } = createProblemSchema.validate(data);
            expect(error).toBeDefined();
        });
    });

    describe('updateProblemSchema', () => {
        it('should allow partial update', () => {
            const data = { title: 'New Title' };
            const { error } = updateProblemSchema.validate(data);
            expect(error).toBeUndefined();
        });
    });
});
