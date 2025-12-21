import { globalError, ClientError } from "shokhijakhon-error-handler";
import { sequelize } from "../lib/db.service.js";
import { UserModel, AdminModel, InstructorModel } from "../models/index.js";
import { updateUserRoleSchema } from "../utils/validators/update.role.js";
import logger from "../utils/logger.js";

const userController = {

    async GET_ALL(req, res) {
        try {
            const users = await UserModel.findAll({
                attributes: { exclude: ["password", "otp", "otp_time"] }
            });

            logger.info(`Fetched all users, count=${users.length}`);

            return res.json({
                status: 200,
                data: users
            });
        } catch (error) {
            logger.error(`GET_ALL error: ${error.message}`);
            return globalError(error, res);
        }
    },

    async GET_BY_ID(req, res) {
        try {
            const { id } = req.params;

            const user = await UserModel.findByPk(id, {
                attributes: { exclude: ["password", "otp", "otp_time"] }
            });

            if (!user) {
                logger.warn(`User not found, id=${id}`);
                throw new ClientError("User not found", 404);
            }

            logger.info(`Fetched user by id=${id}`);
            return res.json({
                status: 200,
                data: user
            });
        } catch (error) {
            logger.error(`GET_BY_ID error: ${error.message}`);
            return globalError(error, res);
        }
    },

    async DELETE_USER(req, res) {
        const transaction = await sequelize.transaction();

        try {
            const { id } = req.params;

            const user = await UserModel.findByPk(id, { transaction });
            if (!user) {
                logger.warn(`Attempt to delete non-existing user, id=${id}`);
                throw new ClientError("User not found", 404);
            }

            await AdminModel.destroy({ where: { user_id: id }, transaction });
            await InstructorModel.destroy({ where: { user_id: id }, transaction });
            await UserModel.destroy({ where: { id }, transaction });

            await transaction.commit();

            logger.info(`Deleted user, id=${id}`);
            return res.json({
                status: 200,
                message: "User successfully deleted"
            });

        } catch (error) {
            await transaction.rollback();
            logger.error(`DELETE_USER error: ${error.message}`);
            return globalError(error, res);
        }
    },

    async UPDATE_ROLE(req, res) {
        const transaction = await sequelize.transaction();

        try {
            const { id } = req.params;
            const { role } = req.body;

            await updateUserRoleSchema.validateAsync({ role }, { abortEarly: false });

            const user = await UserModel.findByPk(id, { transaction });
            if (!user) {
                logger.warn(`Attempt to update role for non-existing user, id=${id}`);
                throw new ClientError("User not found", 404);
            }

            if (user.id === req.user.user_id) {
                logger.warn(`User attempted to change own role, id=${id}`);
                throw new ClientError("You cannot change your own role", 400);
            }

            await AdminModel.destroy({ where: { user_id: id }, transaction });
            await InstructorModel.destroy({ where: { user_id: id }, transaction });

            await UserModel.update({ role }, { where: { id }, transaction });

            if (role === "admin") {
                await AdminModel.create({ user_id: id, is_super: false }, { transaction });
            }

            if (role === "instructor") {
                await InstructorModel.create({ user_id: id, bio: "", skills: "" }, { transaction });
            }

            await transaction.commit();

            logger.info(`Updated role for user id=${id} to role=${role}`);
            return res.json({
                status: 200,
                message: `User role updated to ${role}`
            });

        } catch (error) {
            await transaction.rollback();
            logger.error(`UPDATE_ROLE error: ${error.message}`);
            return globalError(error, res);
        }
    }
};

export default userController;
