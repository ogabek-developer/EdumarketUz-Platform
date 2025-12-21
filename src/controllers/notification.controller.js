import { ClientError, globalError } from "shokhijakhon-error-handler";
import { NotificationModel } from "../models/index.js";
import { createNotificationSchema } from "../utils/validators/notification.validator.js";
import logger from "../utils/logger.js";

const notificationController = {

    async CREATE(req, res) {
        try {
            const data = req.body;

            await createNotificationSchema.validateAsync(data, { abortEarly: false });

            const notification = await NotificationModel.create(data);

            logger.info(`Notification created: id=${notification.id}, title=${data.title || "N/A"}`);

            return res.status(201).json({
                message: "Notification created",
                data: notification,
                status: 201
            });
        } catch (error) {
            logger.error(`CREATE error: ${error.message}`);
            return globalError(error, res);
        }
    },

    async GET_ALL(req, res) {
        try {
            const notifications = await NotificationModel.findAll({
                order: [["createdAt", "DESC"]]
            });

            logger.info(`Fetched all notifications, count=${notifications.length}`);

            return res.json({
                message: "Notifications list",
                data: notifications,
                status: 200
            });
        } catch (error) {
            logger.error(`GET_ALL error: ${error.message}`);
            return globalError(error, res);
        }
    },

    async GET_BY_ID(req, res) {
        try {
            const { id } = req.params;

            const notification = await NotificationModel.findByPk(id);
            if (!notification) throw new ClientError("Notification not found", 404);

            logger.info(`Fetched notification by id=${id}`);

            return res.json({
                message: "Notification",
                data: notification,
                status: 200
            });
        } catch (error) {
            logger.error(`GET_BY_ID error: ${error.message}`);
            return globalError(error, res);
        }
    },

    async DELETE(req, res) {
        try {
            const { id } = req.params;

            const notification = await NotificationModel.findByPk(id);
            if (!notification) throw new ClientError("Notification not found", 404);

            await NotificationModel.destroy({ where: { id } });

            logger.info(`Notification deleted: id=${id}`);

            return res.json({
                message: "Notification deleted",
                status: 200
            });
        } catch (error) {
            logger.error(`DELETE error: ${error.message}`);
            return globalError(error, res);
        }
    }

};

export default notificationController;
