

import Joi from "joi";

export const createCourseSchema = Joi.object({
  instructor_id: Joi.number()
    .integer()
    .required()
    .messages({
      "number.base": "Instructor ID raqam bo‘lishi kerak",
      "number.integer": "Instructor ID butun son bo‘lishi kerak",
      "any.required": "Instructor ID majburiy"
    }),

  category_id: Joi.number()
    .integer()
    .required()
    .messages({
      "number.base": "Category ID raqam bo‘lishi kerak",
      "number.integer": "Category ID butun son bo‘lishi kerak",
      "any.required": "Category ID majburiy"
    }),

  name: Joi.string()
    .min(3)
    .max(150)
    .required()
    .messages({
      "string.base": "Course nomi matn bo‘lishi kerak",
      "string.empty": "Course nomi bo‘sh bo‘lishi mumkin emas",
      "string.min": "Course nomi kamida 3 ta belgidan iborat bo‘lishi kerak",
      "string.max": "Course nomi 150 belgidan oshmasligi kerak",
      "any.required": "Course nomi majburiy"
    }),

  description: Joi.string()
    .min(10)
    .required()
    .messages({
      "string.base": "Description matn bo‘lishi kerak",
      "string.empty": "Description bo‘sh bo‘lishi mumkin emas",
      "string.min": "Description kamida 10 ta belgidan iborat bo‘lishi kerak",
      "any.required": "Description majburiy"
    }),

  price: Joi.number()
    .precision(2)
    .required()
    .messages({
      "number.base": "Narx raqam bo‘lishi kerak",
      "any.required": "Narx majburiy"
    }),

  level: Joi.string()
    .valid("beginner", "intermediate", "advanced")
    .default("beginner")
    .messages({
      "any.only": "Level faqat beginner, intermediate yoki advanced bo‘lishi mumkin"
    }),

  is_free: Joi.boolean()
    .required()
    .messages({
      "boolean.base": "is_free boolean bo‘lishi kerak",
      "any.required": "is_free majburiy"
    }),

  lesson_count: Joi.number()
    .integer()
    .min(0)
    .required()
    .messages({
      "number.base": "Lesson count raqam bo‘lishi kerak",
      "number.integer": "Lesson count butun son bo‘lishi kerak",
      "number.min": "Lesson count manfiy bo‘lishi mumkin emas",
      "any.required": "Lesson count majburiy"
    })
});



export const updateCourseSchema = Joi.object({
  instructor_id: Joi.number()
    .integer()
    .required()
    .messages({
      "number.base": "Instructor ID raqam bo‘lishi kerak",
      "number.integer": "Instructor ID butun son bo‘lishi kerak",
      "any.required": "Instructor ID majburiy"
    }),

  category_id: Joi.number()
    .integer()
    .messages({
      "number.base": "Category ID raqam bo‘lishi kerak",
      "number.integer": "Category ID butun son bo‘lishi kerak"
    }),

  name: Joi.string()
    .min(3)
    .max(150)
    .messages({
      "string.base": "Course nomi matn bo‘lishi kerak",
      "string.min": "Course nomi kamida 3 ta belgidan iborat bo‘lishi kerak",
      "string.max": "Course nomi 150 belgidan oshmasligi kerak"
    }),

  description: Joi.string()
    .min(10)
    .messages({
      "string.base": "Description matn bo‘lishi kerak",
      "string.min": "Description kamida 10 ta belgidan iborat bo‘lishi kerak"
    }),

  price: Joi.number()
    .precision(2)
    .messages({
      "number.base": "Narx raqam bo‘lishi kerak"
    }),

  level: Joi.string()
    .valid("beginner", "intermediate", "advanced")
    .messages({
      "any.only": "Level faqat beginner, intermediate yoki advanced bo‘lishi mumkin"
    }),

  is_free: Joi.boolean()
    .messages({
      "boolean.base": "is_free boolean bo‘lishi kerak"
    }),

  lesson_count: Joi.number()
    .integer()
    .min(0)
    .messages({
      "number.base": "Lesson count raqam bo‘lishi kerak",
      "number.integer": "Lesson count butun son bo‘lishi kerak",
      "number.min": "Lesson count manfiy bo‘lishi mumkin emas"
    })
});
