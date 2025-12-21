import { Op } from "sequelize";
import { ClientError, globalError } from "shokhijakhon-error-handler";
import { PurchaseModel, CourseModel, UserModel } from "../models/index.js";
import logger from "../utils/logger.js";

const statsController = {

  async LAST_30_DAYS_SALES(req, res) {
    try {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 30);

      const sales = await PurchaseModel.findAll({
        where: {
          purchase_date: {
            [Op.gte]: startDate
          }
        },
        include: [
          { 
            model: CourseModel, 
            attributes: ["id", "name", "description", "price"] 
          },
          { 
            model: UserModel, 
            attributes: ["id", "first_name", "last_name", "email"] 
          }
        ],
        order: [["purchase_date", "DESC"]]
      });

      if (!sales.length) {
        logger.info("No sales in the last 30 days");
        return res.json({ status: 200, message: "No sales in the last 30 days", data: [] });
      }

      const stats = sales.map(purchase => ({
        purchase_id: purchase.id,
        purchase_date: purchase.purchase_date,
        course: {
          id: purchase.Course.id,
          name: purchase.Course.name,
          description: purchase.Course.description,
          price: purchase.Course.price
        },
        buyer: {
          id: purchase.User.id,
          first_name: purchase.User.first_name,
          last_name: purchase.User.last_name,
          email: purchase.User.email
        }
      }));

      logger.info(`Fetched last 30 days sales, count=${stats.length}`);

      return res.json({ status: 200, data: stats });

    } catch (error) {
      logger.error(`LAST_30_DAYS_SALES error: ${error.message}`);
      return globalError(error, res);
    }
  }

};

export default statsController;
