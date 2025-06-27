import Joi from 'joi';
import j2s from 'joi-to-swagger';

const complexityEnum = [
  'O(1)',
  'O(log n)',
  'O(n)',
  'O(n log n)',
  'O(n^2)',
  'O(n^3)',
  'O(2^n)',
  'O(n!)'
];

const baseSubmissionSchema = {
  userId: Joi.string().max(50).required(),
  problemId: Joi.string().max(50).required(),
  result: Joi.string().valid('Accepted', 'Denied').required(),
  language: Joi.string().required(),
  submissionDate: Joi.date().required(),
  calculationTimeMs: Joi.number().min(0).max(300000).required(), // Max 5 minutes
  complexity: Joi.string().valid(...complexityEnum).required(),
  memoryUsageKb: Joi.number().min(0).max(1048576).required(), // Max 1GB
  code: Joi.string().max(50000).required(), // Max 50KB of code
};

export const submissionSchema = Joi.object({
  id: Joi.string().required(),
  ...baseSubmissionSchema,
});

export const createSubmissionSchema = Joi.object({
  ...baseSubmissionSchema,
  submissionDate: Joi.forbidden(),
});

export const updateSubmissionSchema = Joi.object({
  userId: Joi.forbidden(),
  problemId: Joi.forbidden(),
  result: Joi.string().valid('Accepted', 'Denied').optional(),
  language: Joi.string().optional(),
  submissionDate: Joi.forbidden(),
  calculationTimeMs: Joi.number().min(0).max(300000).optional(),
  complexity: Joi.string().valid(...complexityEnum).optional(),
  memoryUsageKb: Joi.number().min(0).max(1048576).optional(),
  code: Joi.string().max(50000).optional(),
});

export const submissionSchemaSwagger = j2s(submissionSchema).swagger;
export const submissionCreateSchemaSwagger = j2s(createSubmissionSchema).swagger;
export const submissionUpdateSchemaSwagger = j2s(updateSubmissionSchema).swagger;
