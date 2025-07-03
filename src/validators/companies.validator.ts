import Joi from 'joi';
import j2s from 'joi-to-swagger';

const companySizeEnum = [
  '1-10',
  '11-50',
  '51-200',
  '201-500',
  '501-1000',
  '1001-5000',
  '5001-10000',
  '10000+',
];

const openPositionsSchema = Joi.array()
  .allow(null)
  .items(
    Joi.object({
      position: Joi.string().max(100).required(),
      qualifications: Joi.array().items(Joi.string().max(200)).max(20).required(),
      duration: Joi.string().max(50).required(),
      salary: Joi.string().max(50).required(),
    })
  )
  .max(100);

const upcomingEventsSchema = Joi.array()
  .allow(null)
  .items(
    Joi.object({
      name: Joi.string().max(200).required(),
      duration: Joi.string().max(50).required(),
      location: Joi.string().max(200).required(),
    })
  )
  .max(20);

const baseCompanySchema = {
  name: Joi.string().max(200).required(),
  size: Joi.string()
    .allow(null)
    .valid(...companySizeEnum)
    .optional(),
  country: Joi.string().allow(null).max(100).optional(),
  managedBy: Joi.string().max(50).required(),
  openPositions: openPositionsSchema.optional(),
  upcomingEvents: upcomingEventsSchema.optional(),
};

export const companySchema = Joi.object({
  id: Joi.string().required(),
  ...baseCompanySchema,
  openPositions: openPositionsSchema.required(),
  upcomingEvents: upcomingEventsSchema.required(),
});

export const createCompanySchema = Joi.object({
  username: Joi.string().max(50).required(),
  email: Joi.string().email().max(255).required(),
  password: Joi.string().min(8).max(128).required(),
  companyName: Joi.string().max(200).required(),
});

export const updateCompanySchema = Joi.object({
  name: Joi.string().allow(null).max(200).optional(),
  size: Joi.string()
    .allow(null)
    .valid(...companySizeEnum)
    .optional(),
  country: Joi.string().allow(null).max(100).optional(),
  managedBy: Joi.string().allow(null).max(50).optional(),
  openPositions: openPositionsSchema.optional(),
  upcomingEvents: upcomingEventsSchema.optional(),
});

export const companySchemaSwagger = j2s(companySchema).swagger;
export const companyCreateSchemaSwagger = j2s(createCompanySchema).swagger;
export const companyUpdateSchemaSwagger = j2s(updateCompanySchema).swagger;
