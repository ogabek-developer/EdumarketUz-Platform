
import Joi from "joi";

export const createPaymentSchema = Joi.object({
  purchase_id: Joi.number()
    .integer()
    .required()
    .messages({
      "any.required": "Purchase ID majburiy",
      "number.base": "Purchase ID raqam bo‘lishi kerak",
      "number.integer": "Purchase ID butun son bo‘lishi kerak"
    }),

  transaction_id: Joi.string()
    .min(5)
    .required()
    .messages({
      "any.required": "Transaction ID majburiy",
      "string.base": "Transaction ID matn bo‘lishi kerak",
      "string.min": "Transaction ID juda qisqa"
    })
});

export const updatePaymentStatusSchema = Joi.object({
  status: Joi.string()
    .valid("paid", "canceled")
    .required()
    .messages({
      "any.required": "Status majburiy",
      "any.only": "Status faqat paid yoki canceled bo‘lishi mumkin"
    })
});
