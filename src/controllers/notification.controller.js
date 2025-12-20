

import { ClientError, globalError } from "shokhijakhon-error-handler";
import { NotificationModel } from "../models/index.js";
import { createNotificationSchema } from "../utils/validators/notification.validator.js";

const notificationController = {

    async CREATE(req, res) {
        try {
            const data = req.body;

            await createNotificationSchema.validateAsync(data, { abortEarly: false });

            const notification = await NotificationModel.create(data);

            return res.status(201).json({
                message: "Notification created",
                data: notification,
                status: 201
            });
        } catch (error) {
            return globalError(error, res);
        }
    },

    async GET_ALL(req, res) {
        try {
            const notifications = await NotificationModel.findAll({
                order: [["createdAt", "DESC"]]
            });

            return res.json({
                message: "Notifications list",
                data: notifications,
                status: 200
            });
        } catch (error) {
            return globalError(error, res);
        }
    },

    async GET_BY_ID(req, res) {
        try {
            const { id } = req.params;

            const notification = await NotificationModel.findByPk(id);
            if (!notification) throw new ClientError("Notification not found", 404);

            return res.json({
                message: "Notification",
                data: notification,
                status: 200
            });
        } catch (error) {
            return globalError(error, res);
        }
    },

    async DELETE(req, res) {
        try {
            const { id } = req.params;

            const notification = await NotificationModel.findByPk(id);
            if (!notification) throw new ClientError("Notification not found", 404);

            await NotificationModel.destroy({ where: { id } });

            return res.json({
                message: "Notification deleted",
                status: 200
            });
        } catch (error) {
            return globalError(error, res);
        }
    }

};

export default notificationController;
