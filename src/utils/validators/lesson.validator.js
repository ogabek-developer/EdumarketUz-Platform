import Joi from "joi";

export const createLessonSchema = Joi.object({
  course_id: Joi.number().integer().required().messages({
    "number.base": "Course ID raqam bo‘lishi kerak",
    "number.integer": "Course ID butun son bo‘lishi kerak",
    "any.required": "Course ID majburiy"
  }),
  title: Joi.string().min(3).required().messages({
    "string.base": "Title matn bo‘lishi kerak",
    "string.min": "Title kamida 3 ta belgidan iborat bo‘lishi kerak",
    "any.required": "Title majburiy"
  }),
  duration: Joi.string().required().messages({
    "string.base": "Duration matn bo‘lishi kerak",
    "any.required": "Duration majburiy"
  })
});

export const updateLessonSchema = Joi.object({
  course_id: Joi.number().integer().messages({
    "number.base": "Course ID raqam bo‘lishi kerak",
    "number.integer": "Course ID butun son bo‘lishi kerak"
  }),
  title: Joi.string().min(3).messages({
    "string.base": "Title matn bo‘lishi kerak",
    "string.min": "Title kamida 3 ta belgidan iborat bo‘lishi kerak"
  }),
  duration: Joi.string().messages({
    "string.base": "Duration matn bo‘lishi kerak"
  })
});
