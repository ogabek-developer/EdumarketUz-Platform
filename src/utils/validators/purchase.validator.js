
import Joi from "joi";

export const createPurchaseSchema = Joi.object({
  course_id: Joi.number()
    .integer()
    .required()
    .messages({
      "number.base": "Course ID raqam bo‘lishi kerak",
      "number.integer": "Course ID butun son bo‘lishi kerak",
      "any.required": "Course ID majburiy"
    })
});
