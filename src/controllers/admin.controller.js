
import { ClientError, globalError } from "shokhijakhon-error-handler";
import { AdminModel, UserModel } from "../models/index.js";
import {
  createAdminSchema,
  updateAdminSchema
} from "../utils/validators/admin.validator.js";

const adminController = {

  async CREATE(req, res) {
    try {
      const data = req.body;
      await createAdminSchema.validateAsync(data, { abortEarly: false });

      if (!req.user?.is_super) {
        throw new ClientError("Only super admin can create admin", 403);
      }

      const user = await UserModel.findByPk(data.user_id);
      if (!user) {
        throw new ClientError("User not found", 404);
      }

      if (user.role !== "admin") {
        throw new ClientError("User role must be admin", 400);
      }

      const exists = await AdminModel.findOne({
        where: { user_id: data.user_id }
      });

      if (exists) {
        throw new ClientError("Admin already exists", 409);
      }

      const admin = await AdminModel.create({
        user_id: data.user_id,
        is_super: data.is_super
      });

      return res.status(201).json({
        status: 201,
        data: admin
      });

    } catch (error) {
      return globalError(error, res);
    }
  },

  async GET_ALL(req, res) {
    try {
      const admins = await AdminModel.findAll({
        include: {
          model: UserModel,
          attributes: ["id", "first_name", "last_name", "email", "role"]
        }
      });

      return res.json({
        status: 200,
        data: admins
      });

    } catch (error) {
      return globalError(error, res);
    }
  },

  async GET_BY_ID(req, res) {
    try {
      const { id } = req.params;

      const admin = await AdminModel.findByPk(id, {
        include: {
          model: UserModel,
          attributes: ["id", "first_name", "last_name", "email"]
        }
      });

      if (!admin) {
        throw new ClientError("Admin not found", 404);
      }

      return res.json({
        status: 200,
        data: admin
      });

    } catch (error) {
      return globalError(error, res);
    }
  },

  async UPDATE(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;

      if (!req.user?.is_super) {
        throw new ClientError("Only super admin can update admin", 403);
      }

      await updateAdminSchema.validateAsync(data, { abortEarly: false });

      const admin = await AdminModel.findByPk(id);
      if (!admin) {
        throw new ClientError("Admin not found", 404);
      }

      await admin.update({ is_super: data.is_super });

      return res.json({
        status: 200,
        message: "Admin updated successfully"
      });

    } catch (error) {
      return globalError(error, res);
    }
  },

  async DELETE(req, res) {
    try {
      const { id } = req.params;

      if (!req.user?.is_super) {
        throw new ClientError("Only super admin can delete admin", 403);
      }

      const admin = await AdminModel.findByPk(id);
      if (!admin) {
        throw new ClientError("Admin not found", 404);
      }

      const userId = admin.user_id;

      await admin.destroy();

      await UserModel.update(
        { role: "student" },
        { where: { id: userId } }
      );

      return res.json({
        status: 200,
        message: "Admin deleted and user role reverted to student"
      });

    } catch (error) {
      return globalError(error, res);
    }
  }
};

export default adminController;
