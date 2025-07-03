import Joi from 'joi';
import j2s from 'joi-to-swagger';

export const matchSubmissionSchema = Joi.object({
  calculationTimeMs: Joi.number().required(),
  memoryUsageKb: Joi.number().required(),
  result: Joi.string().required(),
  testResults: Joi.array().items(Joi.boolean()).required(),
});

export const matchSchema = Joi.object({
  roomId: Joi.string().required(),
  problemId: Joi.string().required(),
});

export const matchSubmissionSchemaSwagger = j2s(matchSubmissionSchema).swagger;
export const matchSchemaSwagger = j2s(matchSchema).swagger;
