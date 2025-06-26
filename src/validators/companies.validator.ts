import Joi from 'joi';
import j2s from 'joi-to-swagger';

const openPositionsSchema = Joi.array().items(
  Joi.object({
    position: Joi.string().required(),
    qualifications: Joi.array().items(Joi.string()).required(),
    duration: Joi.string().required(),
    salary: Joi.string().required(),
  })
);

const upcomingEventsSchema = Joi.array().items(
  Joi.object({
    name: Joi.string().required(),
    duration: Joi.string().required(),
    location: Joi.string().required(),
  })
);

const baseCompanySchema = {
  name: Joi.string().required(),
  size: Joi.string().required(),
  country: Joi.string().required(),
  managedBy: Joi.string().required(),
  openPositions: openPositionsSchema,
  upcomingEvents: upcomingEventsSchema,
};

export const companySchema = Joi.object({
  id: Joi.string().required(),
  ...baseCompanySchema,
  openPositions: openPositionsSchema.required(),
  upcomingEvents: upcomingEventsSchema.required(),
});

export const createCompanySchema = Joi.object({
  ...baseCompanySchema,
  openPositions: openPositionsSchema.optional(),
  upcomingEvents: upcomingEventsSchema.optional(),
});

export const updateCompanySchema = Joi.object({
  ...baseCompanySchema,
  name: Joi.string().optional(),
  size: Joi.string().optional(),
  country: Joi.string().optional(),
  managedBy: Joi.string().optional(),
  openPositions: openPositionsSchema.optional(),
  upcomingEvents: upcomingEventsSchema.optional(),
});

export const companySchemaSwagger = j2s(companySchema).swagger;
export const companyCreateSchemaSwagger = j2s(createCompanySchema).swagger;
export const companyUpdateSchemaSwagger = j2s(updateCompanySchema).swagger;
