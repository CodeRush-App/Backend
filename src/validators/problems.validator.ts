import Joi from 'joi';
import j2s from 'joi-to-swagger';

const functionParameterSchema = Joi.object({
  name: Joi.string().max(50).required(),
  type: Joi.string().max(50).required(),
  description: Joi.string().max(500).required(),
});

const functionReturnSchema = Joi.object({
  type: Joi.string().max(50).required(),
  description: Joi.string().max(500).required(),
});

const functionSchema = Joi.object({
  name: Joi.string().max(100).required(),
  parameters: Joi.array().items(functionParameterSchema).max(30).required(),
  return: functionReturnSchema.required(),
});

const exampleSchema = Joi.object({
  input: Joi.any().required(),
  output: Joi.any().required(),
  explanation: Joi.string().max(1000).required(),
});

const testCaseSchema = Joi.object({
  input: Joi.any().required(),
  expectedOutput: Joi.any().required(),
});

const baseProblemSchema = {
  title: Joi.string().max(200).required(),
  slug: Joi.string()
    .max(100)
    .pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .required(),
  difficulty: Joi.string().valid('Easy', 'Medium', 'Hard').required(),
  topic: Joi.string().max(100).required(),
  tags: Joi.array().items(Joi.string().max(50)).max(20).required(),
  description: Joi.string().max(10000).required(),
  function: functionSchema.required(),
  constraints: Joi.array().items(Joi.string().max(500)).max(20).required(),
  examples: Joi.array().items(exampleSchema).max(10).required(),
  testCases: Joi.array().items(testCaseSchema).max(100).required(),
  createdAt: Joi.date().required(),
  updatedAt: Joi.date().required(),
};

export const problemSchema = Joi.object({
  id: Joi.string().required(),
  ...baseProblemSchema,
});

export const createProblemSchema = Joi.object({
  ...baseProblemSchema,
  createdAt: Joi.forbidden(),
  updatedAt: Joi.forbidden(),
});

export const updateProblemSchema = Joi.object({
  title: Joi.string().allow(null).max(200).optional(),
  slug: Joi.string()
    .allow(null)
    .max(100)
    .pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .optional(),
  difficulty: Joi.string().allow(null).valid('Easy', 'Medium', 'Hard').optional(),
  topic: Joi.string().allow(null).max(100).optional(),
  tags: Joi.array().allow(null).items(Joi.string().max(50)).max(20).optional(),
  description: Joi.string().allow(null).max(10000).optional(),
  function: functionSchema.allow(null).optional(),
  constraints: Joi.array().allow(null).items(Joi.string().max(500)).max(20).optional(),
  examples: Joi.array().allow(null).items(exampleSchema).max(10).optional(),
  testCases: Joi.array().allow(null).items(testCaseSchema).max(100).optional(),
  createdAt: Joi.date().forbidden(),
  updatedAt: Joi.date().forbidden(),
});

export const problemSchemaSwagger = j2s(problemSchema).swagger;
export const problemCreateSchemaSwagger = j2s(createProblemSchema).swagger;
export const problemUpdateSchemaSwagger = j2s(updateProblemSchema).swagger;
