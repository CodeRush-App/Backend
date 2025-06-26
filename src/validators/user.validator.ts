import Joi from 'joi';
import j2s from 'joi-to-swagger';

// Full User schema (matches Prisma model for output)
export const userSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  country: Joi.string().required(),
  score: Joi.number().integer().required(),
  elo: Joi.number().integer().required(),
  phoneNumber: Joi.string().allow(null, '').optional(),
  skills: Joi.array().items(Joi.string()).required(),
  education: Joi.array().items(Joi.any()).required(),
  workExperience: Joi.array().items(Joi.any()).required(),
  isAdmin: Joi.boolean().required(),
});

// Schema for creating a user (input)
export const createUserSchema = Joi.object({
  name: Joi.string().required(),
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  country: Joi.string().required(),
  phoneNumber: Joi.string().allow(null, '').optional(),
  skills: Joi.array().items(Joi.string()).optional(),
  education: Joi.array().items(Joi.any()).optional(),
  workExperience: Joi.array().items(Joi.any()).optional(),
  isAdmin: Joi.boolean().optional(),
});

// Schema for updating a user (input)
export const updateUserSchema = Joi.object({
  name: Joi.string().required(),
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  country: Joi.string().required(),
  phoneNumber: Joi.string().allow(null, '').optional(),
  skills: Joi.array().items(Joi.string()).optional(),
  education: Joi.array().items(Joi.any()).optional(),
  workExperience: Joi.array().items(Joi.any()).optional(),
  isAdmin: Joi.boolean().optional(),
});

// Swagger equivalents
export const userSchemaSwagger = j2s(userSchema).swagger;
export const userCreateSchemaSwagger = j2s(createUserSchema).swagger;
export const userUpdateSchemaSwagger = j2s(updateUserSchema).swagger;
