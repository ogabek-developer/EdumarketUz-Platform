
import Joi from "joi";

export const createNotificationSchema = Joi.object({
    sender_type: Joi.string().valid("admin", "instructor").required(),
    sender_id: Joi.number().integer().required(),
    receiver_type: Joi.string().valid("admin", "instructor", "student").required(),
    type: Joi.string().valid("order", "payment", "course", "system", "admin").required(),
    title: Joi.string().required(),
    message: Joi.string().required()
});

export const idParamSchema = Joi.object({
    id: Joi.number().integer().required()
});
