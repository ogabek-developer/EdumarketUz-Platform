import { ClientError, globalError } from "shokhijakhon-error-handler";
import { PaymentModel, PurchaseModel, CourseModel } from "../models/index.js";
import { createPaymentSchema } from "../utils/validators/payment.validator.js";
import { sequelize } from "../lib/db.service.js";

const paymentController = {

  async CREATE(req, res) {
    const transaction = await sequelize.transaction();
    try {
      const data = req.body;
      await createPaymentSchema.validateAsync(data, { abortEarly: false });

      const user_id = req.user.user_id;
      const { purchase_id, transaction_id } = data;

      const purchase = await PurchaseModel.findOne({
        where: { id: purchase_id, user_id },
        include: [{ model: CourseModel }],
        transaction
      });

      if (!purchase)
        throw new ClientError("Purchase not found", 404);

      const exists = await PaymentModel.findOne({
        where: { purchase_id },
        transaction
      });

      if (exists)
        throw new ClientError("Payment already exists for this purchase", 400);

      const payment = await PaymentModel.create({
        purchase_id,
        user_id,
        amount: purchase.total_price,
        transaction_id,
        status: "paid",           // darhol paid
        paid_at: new Date()       // hozirgi vaqt
      }, { transaction });

      await transaction.commit();

      return res.status(201).json({
        status: 201,
        data: {
          id: payment.id,
          amount: payment.amount,
          status: payment.status,
          paid_at: payment.paid_at,
          course: {
            id: purchase.Course.id,
            name: purchase.Course.name
          }
        }
      });

    } catch (error) {
      await transaction.rollback();
      return globalError(error, res);
    }
  },

  async GET_ALL(req, res) {
    try {
      const payments = await PaymentModel.findAll({
        where: { user_id: req.user.user_id },
        include: [{ model: PurchaseModel, include: [CourseModel] }]
      });

      return res.json({ status: 200, data: payments });
    } catch (error) {
      return globalError(error, res);
    }
  },

  async GET_BY_ID(req, res) {
    try {
      const payment = await PaymentModel.findOne({
        where: { id: req.params.id, user_id: req.user.user_id },
        include: [{ model: PurchaseModel, include: [CourseModel] }]
      });

      if (!payment)
        throw new ClientError("Payment not found", 404);

      return res.json({ status: 200, data: payment });
    } catch (error) {
      return globalError(error, res);
    }
  }

};

export default paymentController;
