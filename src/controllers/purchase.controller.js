
import { ClientError, globalError } from "shokhijakhon-error-handler";
import { sequelize } from "../lib/db.service.js";
import {
  PurchaseModel,
  CourseModel
} from "../models/index.js";
import { createPurchaseSchema } from "../utils/validators/purchase.validator.js";

const purchaseController = {

  async CREATE(req, res) {
    const transaction = await sequelize.transaction();
    try {
      const data = req.body;
      const userId = req.user.user_id;

      await createPurchaseSchema.validateAsync(data, { abortEarly: false });

      const course = await CourseModel.findByPk(data.course_id, { transaction });
      if (!course) throw new ClientError("Course not found", 404);

      if (course.is_free) {
        throw new ClientError("Free course does not require purchase", 400);
      }

      const alreadyPurchased = await PurchaseModel.findOne({
        where: {
          user_id: userId,
          course_id: course.id
        },
        transaction
      });

      if (alreadyPurchased) {
        throw new ClientError("Course already purchased", 400);
      }

      const purchase = await PurchaseModel.create({
        user_id: userId,
        course_id: course.id,
        total_price: course.price,
        purchase_date: new Date()
      }, { transaction });

      await transaction.commit();

      return res.status(201).json({
        status: 201,
        data: {
          id: purchase.id,
          course: {
            id: course.id,
            name: course.name,
            price: course.price
          },
          total_price: purchase.total_price,
          purchase_date: purchase.purchase_date
        }
      });

    } catch (error) {
      await transaction.rollback();
      return globalError(error, res);
    }
  },

  async GET_ALL(req, res) {
    try {
      const purchases = await PurchaseModel.findAll({
        where: { user_id: req.user.user_id },
        include: [
          {
            model: CourseModel,
            attributes: ["id", "name", "price"]
          }
        ]
      });

      return res.json({
        status: 200,
        data: purchases
      });

    } catch (error) {
      return globalError(error, res);
    }
  },

  async GET_BY_ID(req, res) {
    try {
      const purchase = await PurchaseModel.findOne({
        where: {
          id: req.params.id,
          user_id: req.user.user_id
        },
        include: [
          {
            model: CourseModel,
            attributes: ["id", "name", "price"]
          }
        ]
      });

      if (!purchase) throw new ClientError("Purchase not found", 404);

      return res.json({
        status: 200,
        data: purchase
      });

    } catch (error) {
      return globalError(error, res);
    }
  },

  async DELETE(req, res) {
    try {
      const purchase = await PurchaseModel.findOne({
        where: {
          id: req.params.id,
          user_id: req.user.user_id
        }
      });

      if (!purchase) throw new ClientError("Purchase not found", 404);

      await PurchaseModel.destroy({ where: { id: purchase.id } });

      return res.json({
        status: 200,
        message: "Purchase deleted"
      });

    } catch (error) {
      return globalError(error, res);
    }
  }

};

export default purchaseController;
