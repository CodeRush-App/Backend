import Joi from 'joi';
import j2s from 'joi-to-swagger';

const educationItemSchema = Joi.object({
  institution: Joi.string().max(200).required(),
  major: Joi.string().max(100).required(),
  degree: Joi.string().max(100).required(),
  start: Joi.string().max(50).required(),
  end: Joi.string().max(50).required(),
  gpa: Joi.number().min(0).max(4).required(),
  notes: Joi.string().max(1000).optional(),
});

const workExperienceItemSchema = Joi.object({
  position: Joi.string().max(100).required(),
  company: Joi.string().max(200).required(),
  start: Joi.string().max(50).required(),
  end: Joi.string().max(50).required(),
  location: Joi.string().max(200).required(),
  notes: Joi.string().max(1000).optional(),
});

const baseUserSchema = {
  name: Joi.string().max(100).optional(),
  username: Joi.string().max(50).required(),
  email: Joi.string().email().max(255).required(),
  password: Joi.string().min(8).max(128).required(),
  country: Joi.string().max(100).optional(),
  phoneNumber: Joi.string().allow(null, '').max(20).optional(),
  skills: Joi.array().items(Joi.string().max(50)).max(50).optional(),
  education: Joi.array().items(educationItemSchema).max(20).optional(),
  workExperience: Joi.array().items(workExperienceItemSchema).max(20).optional(),
  score: Joi.number().integer().min(0).required(),
  elo: Joi.number().integer().min(0).required(),
  isAdmin: Joi.boolean().required(),
};

export const userSchema = Joi.object({
  id: Joi.string().required(),
  ...baseUserSchema,
});

export const createUserSchema = Joi.object({
  ...baseUserSchema,
  score: Joi.forbidden(),
  elo: Joi.forbidden(),
  isAdmin: Joi.forbidden(),
});

export const updateUserSchema = Joi.object({
  name: Joi.string().max(100).optional(),
  username: Joi.string().max(50).optional(),
  email: Joi.forbidden(),
  password: Joi.string().min(8).max(128).optional(),
  country: Joi.string().max(100).optional(),
  phoneNumber: Joi.string().allow(null, '').max(20).optional(),
  skills: Joi.array().items(Joi.string().max(50)).max(50).optional(),
  education: Joi.array().items(educationItemSchema).max(20).optional(),
  workExperience: Joi.array().items(workExperienceItemSchema).max(20).optional(),
  score: Joi.forbidden(),
  elo: Joi.forbidden(),
  isAdmin: Joi.forbidden(),
});

export const userSchemaSwagger = j2s(userSchema).swagger;
export const userCreateSchemaSwagger = j2s(createUserSchema).swagger;
export const userUpdateSchemaSwagger = j2s(updateUserSchema).swagger;
