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
  education: Joi.array().items(
    Joi.object({
      institution: Joi.string().required(),
      major: Joi.string().required(),
      degree: Joi.string().required(),
      start: Joi.string().required(),
      end: Joi.string().required(),
      gpa: Joi.number().required(),
      notes: Joi.string().optional(),
    })
  ).required(),
  workExperience: Joi.array().items(
    Joi.object({
      position: Joi.string().required(),
      company: Joi.string().required(),
      start: Joi.string().required(),
      end: Joi.string().required(),
      location: Joi.string().required(),
      notes: Joi.string().optional(),
    })
  ).required(),
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
  education: Joi.array().items(
    Joi.object({
      institution: Joi.string().required(),
      major: Joi.string().required(),
      degree: Joi.string().required(),
      start: Joi.string().required(),
      end: Joi.string().required(),
      gpa: Joi.number().required(),
      notes: Joi.string().optional(),
    })
  ).optional(),
  workExperience: Joi.array().items(
    Joi.object({
      position: Joi.string().required(),
      company: Joi.string().required(),
      start: Joi.string().required(),
      end: Joi.string().required(),
      location: Joi.string().required(),
      notes: Joi.string().optional(),
    })
  ).optional(),
  isAdmin: Joi.boolean().forbidden(),
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
  education: Joi.array().items(Joi.object({
    institution: Joi.string().required(),
    major: Joi.string().required(),
    degree: Joi.string().required(),
    start: Joi.string().required(),
    end: Joi.string().required(),
    gpa: Joi.number().required(),
    notes: Joi.string().optional(),
  })).optional(),
  workExperience: Joi.array().items(Joi.object({
    position: Joi.string().required(),
    company: Joi.string().required(),
    start: Joi.string().required(),
    end: Joi.string().required(),
    location: Joi.string().required(),
    notes: Joi.string().optional(),
  })).optional(),
  isAdmin: Joi.boolean().forbidden(),
});

// Swagger equivalents
export const userSchemaSwagger = j2s(userSchema).swagger;
export const userCreateSchemaSwagger = j2s(createUserSchema).swagger;
export const userUpdateSchemaSwagger = j2s(updateUserSchema).swagger;
