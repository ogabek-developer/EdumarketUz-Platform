

import Joi from "joi";

export const createAdminSchema = Joi.object({
  user_id: Joi.number().integer().required(),
  is_super: Joi.boolean().default(false)
});

export const updateAdminSchema = Joi.object({
  is_super: Joi.boolean().required()
});
