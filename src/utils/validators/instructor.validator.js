import Joi from "joi";

export const createInstructorSchema = Joi.object({
  user_id: Joi.number().integer().required(),
  bio: Joi.string().min(10).max(1000).required(),
  skills: Joi.string().min(3).max(255).required()
});

export const updateInstructorSchema = Joi.object({
  bio: Joi.string().min(10).max(1000).optional(),
  skills: Joi.string().min(3).max(255).optional()
});
