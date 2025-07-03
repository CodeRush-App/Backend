import Joi from 'joi';
import j2s from 'joi-to-swagger';

export const providerEnum = ['google', 'github', 'credentials'];

const educationItemSchema = Joi.object({
  institution: Joi.string().max(200).required(),
  major: Joi.string().max(100).required(),
  degree: Joi.string().max(100).required(),
  start: Joi.string().max(50).required(),
  end: Joi.string().max(50).required(),
  gpa: Joi.number().min(0).max(4).required(),
  notes: Joi.string().allow(null).max(1000).optional(),
});

const workExperienceItemSchema = Joi.object({
  position: Joi.string().max(100).required(),
  company: Joi.string().max(200).required(),
  start: Joi.string().max(50).required(),
  end: Joi.string().max(50).required(),
  location: Joi.string().max(200).required(),
  notes: Joi.string().allow(null).max(1000).optional(),
});

const baseUserSchema = {
  name: Joi.string().allow(null).max(100).optional(),
  username: Joi.string().max(50).required(),
  email: Joi.string().email().max(255).required(),
  country: Joi.string().allow(null).max(100).optional(),
  phoneNumber: Joi.string().allow(null).max(20).optional(),
  skills: Joi.array().allow(null).items(Joi.string().max(50)).max(50).optional(),
  education: Joi.array().allow(null).items(educationItemSchema).max(20).optional(),
  workExperience: Joi.array().allow(null).items(workExperienceItemSchema).max(20).optional(),
  score: Joi.number().integer().min(0).required(),
  elo: Joi.number().integer().min(0).required(),
  providerId: Joi.string().allow(null).max(50).optional(),
  provider: Joi.string()
    .valid(...providerEnum)
    .required(),
  isAdmin: Joi.boolean().required(),
};

export const userSchema = Joi.object({
  id: Joi.string().required(),
  ...baseUserSchema,
});

export const createUserSchema = Joi.object({
  ...baseUserSchema,
  password: Joi.string().min(8).max(128).required(),
  score: Joi.forbidden(),
  elo: Joi.forbidden(),
  isAdmin: Joi.forbidden(),
});

export const updateUserSchema = Joi.object({
  name: Joi.string().allow(null).max(100).optional(),
  username: Joi.string().allow(null).max(50).optional(),
  email: Joi.forbidden(), // Email cannot be changed due to unique constraint
  password: Joi.string().allow(null).min(8).max(128).optional(),
  country: Joi.string().allow(null).max(100).optional(),
  phoneNumber: Joi.string().allow(null).max(20).optional(),
  skills: Joi.array().allow(null).items(Joi.string().max(50)).max(50).optional(),
  education: Joi.array().allow(null).items(educationItemSchema).max(20).optional(),
  workExperience: Joi.array().allow(null).items(workExperienceItemSchema).max(20).optional(),
  score: Joi.forbidden(),
  elo: Joi.forbidden(),
  providerId: Joi.forbidden(),
  provider: Joi.forbidden(),
  isAdmin: Joi.forbidden(),
});

export const userScoresSchema = Joi.object({
  id: Joi.string().required(),
  username: Joi.string().required(),
  score: Joi.number().required(),
  elo: Joi.number().required(),
  country: Joi.string().allow(null).max(100).optional(),
});

export const userSchemaSwagger = j2s(userSchema).swagger;
export const userCreateSchemaSwagger = j2s(createUserSchema).swagger;
export const userUpdateSchemaSwagger = j2s(updateUserSchema).swagger;
export const userScoresSchemaSwagger = j2s(userScoresSchema).swagger;
