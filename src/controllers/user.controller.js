import { globalError, ClientError } from "shokhijakhon-error-handler";
import { sequelize } from "../lib/db.service.js";
import {
    UserModel,
    AdminModel,
    InstructorModel
} from "../models/index.js";
import { updateUserRoleSchema } from "../utils/validators/update.role.js";

const userController = {

    async GET_ALL(req, res) {
        try {
            const users = await UserModel.findAll({
                attributes: { exclude: ["password", "otp", "otp_time"] }
            });

            return res.json({
                status: 200,
                data: users
            });
        } catch (error) {
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
                throw new ClientError("User not found", 404);
            }

            return res.json({
                status: 200,
                data: user
            });
        } catch (error) {
            return globalError(error, res);
        }
    },

    async DELETE_USER(req, res) {
        const transaction = await sequelize.transaction();

        try {
            const { id } = req.params;

            const user = await UserModel.findByPk(id, { transaction });
            if (!user) {
                throw new ClientError("User not found", 404);
            }

            await AdminModel.destroy({
                where: { user_id: id },
                transaction
            });

            await InstructorModel.destroy({
                where: { user_id: id },
                transaction
            });

            await UserModel.destroy({
                where: { id },
                transaction
            });

            await transaction.commit();

            return res.json({
                status: 200,
                message: "User successfully deleted"
            });

        } catch (error) {
            await transaction.rollback();
            return globalError(error, res);
        }
    },

    async UPDATE_ROLE(req, res) {
        const transaction = await sequelize.transaction();

        try {
            const { id } = req.params;
            const { role } = req.body;

            await updateUserRoleSchema.validateAsync(
                { role },
                { abortEarly: false }
            );

            const user = await UserModel.findByPk(id, { transaction });
            if (!user) {
                throw new ClientError("User not found", 404);
            }

            if (user.id === req.user.user_id) {
                throw new ClientError(
                    "You cannot change your own role",
                    400
                );
            }

            await AdminModel.destroy({
                where: { user_id: id },
                transaction
            });

            await InstructorModel.destroy({
                where: { user_id: id },
                transaction
            });

            await UserModel.update(
                { role },
                { where: { id }, transaction }
            );

            if (role === "admin") {
                await AdminModel.create(
                    {
                        user_id: id,
                        is_super: false
                    },
                    { transaction }
                );
            }

            if (role === "instructor") {
                await InstructorModel.create(
                    {
                        user_id: id,
                        bio: "",
                        skills: ""
                    },
                    { transaction }
                );
            }

            await transaction.commit();

            return res.json({
                status: 200,
                message: `User role updated to ${role}`
            });

        } catch (error) {
            await transaction.rollback();
            return globalError(error, res);
        }
    }
};

export default userController;
