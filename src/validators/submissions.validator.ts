import Joi from 'joi';
import j2s from 'joi-to-swagger';

const baseSubmissionSchema = {
  userId: Joi.string().required(),
  problemId: Joi.string().required(),
  result: Joi.string().valid('Accepted', 'Denied').required(),
  language: Joi.string().required(),
  submissionDate: Joi.date().required(),
  calculationTimeMs: Joi.number().required(),
  complexity: Joi.string().required(),
  memoryUsageKb: Joi.number().required(),
  code: Joi.string().required(),
};

export const submissionSchema = Joi.object({
  id: Joi.string().required(),
  ...baseSubmissionSchema,
});

export const createSubmissionSchema = Joi.object({
  ...baseSubmissionSchema,
});

export const updateSubmissionSchema = Joi.object({
  userId: Joi.string().optional(),
  problemId: Joi.string().optional(),
  result: Joi.string().valid('Accepted', 'Denied').optional(),
  language: Joi.string().optional(),
  submissionDate: Joi.date().optional(),
  calculationTimeMs: Joi.number().optional(),
  complexity: Joi.string().optional(),
  memoryUsageKb: Joi.number().optional(),
  code: Joi.string().optional(),
});

export const submissionSchemaSwagger = j2s(submissionSchema).swagger;
export const submissionCreateSchemaSwagger = j2s(createSubmissionSchema).swagger;
export const submissionUpdateSchemaSwagger = j2s(updateSubmissionSchema).swagger;
