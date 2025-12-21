import { ClientError, globalError } from "shokhijakhon-error-handler";
import { InstructorModel, UserModel } from "../models/index.js";
import {
  createInstructorSchema,
  updateInstructorSchema
} from "../utils/validators/instructor.validator.js";
import logger from "../utils/logger.js";

const instructorController = {

  async CREATE(req, res) {
    try {
      const data = req.body;
      await createInstructorSchema.validateAsync(data, { abortEarly: false });

      const user = await UserModel.findByPk(data.user_id);
      if (!user) {
        throw new ClientError("User not found", 404);
      }

      if (user.role !== "instructor") {
        throw new ClientError("User role must be instructor", 400);
      }

      const exists = await InstructorModel.findOne({
        where: { user_id: data.user_id }
      });

      if (exists) {
        throw new ClientError("Instructor already exists", 409);
      }

      const instructor = await InstructorModel.create({
        user_id: data.user_id,
        bio: data.bio,
        skills: data.skills
      });

      logger.info(`Instructor created: id=${instructor.id}, user_id=${data.user_id}`);

      return res.status(201).json({
        status: 201,
        data: instructor
      });

    } catch (error) {
      logger.error(`CREATE error: ${error.message}`);
      return globalError(error, res);
    }
  },

  async GET_ALL(req, res) {
    try {
      const instructors = await InstructorModel.findAll({
        include: {
          model: UserModel,
          attributes: ["id", "first_name", "last_name", "email", "role"]
        }
      });

      logger.info(`Fetched all instructors, count=${instructors.length}`);

      return res.json({
        status: 200,
        data: instructors
      });

    } catch (error) {
      logger.error(`GET_ALL error: ${error.message}`);
      return globalError(error, res);
    }
  },

  async GET_BY_ID(req, res) {
    try {
      const { id } = req.params;

      const instructor = await InstructorModel.findByPk(id, {
        include: {
          model: UserModel,
          attributes: ["id", "first_name", "last_name", "email"]
        }
      });

      if (!instructor) {
        throw new ClientError("Instructor not found", 404);
      }

      logger.info(`Fetched instructor by id=${id}`);

      return res.json({
        status: 200,
        data: instructor
      });

    } catch (error) {
      logger.error(`GET_BY_ID error: ${error.message}`);
      return globalError(error, res);
    }
  },

  async UPDATE(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;

      await updateInstructorSchema.validateAsync(data, { abortEarly: false });

      const instructor = await InstructorModel.findByPk(id);
      if (!instructor) {
        throw new ClientError("Instructor not found", 404);
      }

      await instructor.update(data);

      logger.info(`Instructor updated: id=${id}, data=${JSON.stringify(data)}`);

      return res.json({
        status: 200,
        message: "Instructor updated successfully"
      });

    } catch (error) {
      logger.error(`UPDATE error: ${error.message}`);
      return globalError(error, res);
    }
  },

  async DELETE(req, res) {
    try {
      const { id } = req.params;

      const instructor = await InstructorModel.findByPk(id);
      if (!instructor) {
        throw new ClientError("Instructor not found", 404);
      }

      const userId = instructor.user_id;

      await instructor.destroy();

      await UserModel.update(
        { role: "student" },
        { where: { id: userId } }
      );

      logger.info(`Instructor deleted: id=${id}, user_id=${userId}`);

      return res.json({
        status: 200,
        message: "Instructor deleted and user role reverted to student"
      });

    } catch (error) {
      logger.error(`DELETE error: ${error.message}`);
      return globalError(error, res);
    }
  }
};

export default instructorController;
