import Joi from "joi";

export const updateUserRoleSchema = Joi.object({
    role: Joi.string()
        .valid("student", "instructor", "admin")
        .required()
});
