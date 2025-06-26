import Joi from 'joi';
import j2s from 'joi-to-swagger';

export const companySchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  size: Joi.string().required(),
  country: Joi.string().required(),
  managedBy: Joi.string().required(),
  openPositions: Joi.array().items(
    Joi.object({
      position: Joi.string().required(),
      qualifications: Joi.array().items(Joi.string()).required(),
      duration: Joi.string().required(),
      salary: Joi.string().required(),
    })
  ).required(),
  upcomingEvents: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      duration: Joi.string().required(),
      location: Joi.string().required(),
    })
  ).required(),

});

export const createCompanySchema = Joi.object({
  name: Joi.string().required(),
  size: Joi.string().required(),
  country: Joi.string().required(),
  managedBy: Joi.string().required(),
  openPositions: Joi.array().items(
    Joi.object({
      position: Joi.string().required(),
      qualifications: Joi.array().items(Joi.string()).required(),
      duration: Joi.string().required(),
      salary: Joi.string().required(),
    })
  ).optional(),
  upcomingEvents: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      duration: Joi.string().required(),
      location: Joi.string().required(),
    })
  ).optional(),
});

export const updateCompanySchema = Joi.object({
  name: Joi.string().optional(),
  size: Joi.string().optional(),
  country: Joi.string().optional(),
  managedBy: Joi.string().optional(),
  openPositions: Joi.array().items(
    Joi.object({
      position: Joi.string().required(),
      qualifications: Joi.array().items(Joi.string()).required(),
      duration: Joi.string().required(),
      salary: Joi.string().required(),
    })
  ).optional(),
  upcomingEvents: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      duration: Joi.string().required(),
      location: Joi.string().required(),
    })
  ).optional(),
});

export const companySchemaSwagger = j2s(companySchema).swagger;
export const companyCreateSchemaSwagger = j2s(createCompanySchema).swagger;
export const companyUpdateSchemaSwagger = j2s(updateCompanySchema).swagger;
