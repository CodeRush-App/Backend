import Joi from 'joi';
import j2s from 'joi-to-swagger';

// Base schemas for nested objects
const functionParameterSchema = Joi.object({
  name: Joi.string().required(),
  type: Joi.string().required(),
  description: Joi.string().required(),
});

const functionReturnSchema = Joi.object({
  type: Joi.string().required(),
  description: Joi.string().required(),
});

const functionSchema = Joi.object({
  name: Joi.string().required(),
  parameters: Joi.array().items(functionParameterSchema).required(),
  return: functionReturnSchema.required(),
});

const exampleSchema = Joi.object({
  input: Joi.any().required(),
  output: Joi.any().required(),
  explanation: Joi.string().required(),
});

const testCaseSchema = Joi.object({
  input: Joi.any().required(),
  expectedOutput: Joi.any().required(),
});

// Base problem fields
const baseProblemSchema = {
  title: Joi.string().required(),
  slug: Joi.string().required(),
  difficulty: Joi.string().valid('Easy', 'Medium', 'Hard').required(),
  topic: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).required(),
  description: Joi.string().required(),
  function: functionSchema.required(),
  constraints: Joi.array().items(Joi.string()).required(),
  examples: Joi.array().items(exampleSchema).required(),
  testCases: Joi.array().items(testCaseSchema).required(),
  createdAt: Joi.date().required(),
  updatedAt: Joi.date().required(),
};

export const problemSchema = Joi.object({
  id: Joi.string().required(),
  ...baseProblemSchema,
});

export const createProblemSchema = Joi.object({
  ...baseProblemSchema,
});

export const updateProblemSchema = Joi.object({
  title: Joi.string().optional(),
  slug: Joi.string().optional(),
  difficulty: Joi.string().valid('Easy', 'Medium', 'Hard').optional(),
  topic: Joi.string().optional(),
  tags: Joi.array().items(Joi.string()).optional(),
  description: Joi.string().optional(),
  function: functionSchema.optional(),
  constraints: Joi.array().items(Joi.string()).optional(),
  examples: Joi.array().items(exampleSchema).optional(),
  testCases: Joi.array().items(testCaseSchema).optional(),
  createdAt: Joi.date().optional(),
  updatedAt: Joi.date().optional(),
});


export const problemSchemaSwagger = j2s(problemSchema).swagger;
export const problemCreateSchemaSwagger = j2s(createProblemSchema).swagger;
export const problemUpdateSchemaSwagger = j2s(updateProblemSchema).swagger;
