import { globalError, ClientError } from "shokhijakhon-error-handler";
import { UserModel } from "../models/index.js";
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
        try {
            const { id } = req.params;

            const user = await UserModel.findByPk(id);
            if (!user) {
                throw new ClientError("User not found", 404);
            }

            await UserModel.destroy({ where: { id } });

            return res.json({
                status: 200,
                message: "User successfully deleted"
            });
        } catch (error) {
            return globalError(error, res);
        }
    },


    async UPDATE_ROLE(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;

            await updateUserRoleSchema.validateAsync(data, { abortEarly: false });

            const user = await UserModel.findByPk(id);
            if (!user) {
                throw new ClientError("User not found", 404);
            }

            if (user.id === req.user.user_id) {
                throw new ClientError("You cannot change your own role", 400);
            }

            await UserModel.update(
                { role: data.role },
                { where: { id } }
            );

            return res.json({
                status: 200,
                message: `User role updated to ${data.role}`
            });

        } catch (error) {
            return globalError(error, res);
        }

    }
};

export default userController;
