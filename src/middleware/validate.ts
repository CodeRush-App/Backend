import { RequestHandler } from 'express';
import Joi from 'joi';

/**
 * Middleware to validate request body against a Joi schema.
 * Sends 400 with error messages if validation fails.
 * @param schema Joi.ObjectSchema for validation
 * @returns Express RequestHandler
 */
export const validate =
  (schema: Joi.ObjectSchema): RequestHandler =>
  (req, res, next) => {
    // Validate request body against schema
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      // Respond with all validation error messages
      res.status(400).json({
        errors: error.details.map((d: Joi.ValidationErrorItem) => d.message),
      });
    } else {
      next();
    }
  };
