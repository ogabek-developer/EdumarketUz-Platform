import { ClientError, globalError } from "shokhijakhon-error-handler";
import { CourseModel, CategoryModel, InstructorModel, UserModel } from "../models/index.js";
import { createCourseSchema, updateCourseSchema } from "../utils/validators/course.validator.js";
import logger from "../utils/logger.js";

const courseController = {

    async CREATE(req, res) {
        try {
            const data = req.body;
            await createCourseSchema.validateAsync(data, { abortEarly: false });

            const instructor = await InstructorModel.findByPk(data.instructor_id, {
                include: [{ model: UserModel, attributes: ["id", "first_name", "last_name", "email", "phone_number", "avatar"] }]
            });
            if (!instructor) throw new ClientError("Instructor not found", 404);

            if (req.user.role === "instructor" && req.user.user_id !== instructor.user_id) {
                throw new ClientError("You can only create courses for yourself", 403);
            }

            const category = await CategoryModel.findByPk(data.category_id);
            if (!category) throw new ClientError("Category not found", 404);

            const course = await CourseModel.create({
                instructor_id: instructor.id,
                category_id: category.id,
                name: data.name,
                description: data.description,
                price: data.price,
                level: data.level,
                is_free: data.is_free,
                lesson_count: data.lesson_count || 1
            });

            logger.info(`Course created: id=${course.id}, name=${course.name}, instructor_id=${instructor.id}`);

            const response = {
                id: course.id,
                name: course.name,
                description: course.description,
                price: course.price,
                level: course.level,
                is_free: course.is_free,
                lesson_count: course.lesson_count || 1,
                instructor: {
                    id: instructor.id,
                    user_id: instructor.user_id,
                    first_name: instructor.User.first_name,
                    last_name: instructor.User.last_name,
                    email: instructor.User.email,
                    phone_number: instructor.User.phone_number,
                    avatar: instructor.User.avatar
                },
                category: { id: category.id, name: category.name },
                createdAt: course.createdAt,
                updatedAt: course.updatedAt
            };

            return res.status(201).json({ status: 201, data: response });

        } catch (error) {
            logger.error(`CREATE error: ${error.message}`);
            return globalError(error, res);
        }
    },

    async GET_ALL(req, res) {
        try {
            const courses = await CourseModel.findAll({
                include: [
                    { model: InstructorModel, attributes: ["id", "user_id"], include: [{ model: UserModel, attributes: ["id", "first_name", "last_name", "email", "phone_number", "avatar"] }] },
                    { model: CategoryModel, attributes: ["id", "name"] }
                ]
            });

            const response = courses.map(course => ({
                id: course.id,
                name: course.name,
                description: course.description,
                price: course.price,
                level: course.level,
                is_free: course.is_free,
                lesson_count: course.lesson_count,
                instructor: {
                    id: course.Instructor.id,
                    user_id: course.Instructor.user_id,
                    first_name: course.Instructor.User.first_name,
                    last_name: course.Instructor.User.last_name,
                    email: course.Instructor.User.email,
                    phone_number: course.Instructor.User.phone_number,
                    avatar: course.Instructor.User.avatar
                },
                category: { id: course.Category.id, name: course.Category.name },
                createdAt: course.createdAt,
                updatedAt: course.updatedAt
            }));

            logger.info(`Fetched all courses, count=${courses.length}`);

            return res.json({ status: 200, data: response });
        } catch (error) {
            logger.error(`GET_ALL error: ${error.message}`);
            return globalError(error, res);
        }
    },

    async GET_BY_ID(req, res) {
        try {
            const course = await CourseModel.findByPk(req.params.id, {
                include: [
                    { model: InstructorModel, attributes: ["id", "user_id"], include: [{ model: UserModel, attributes: ["id", "first_name", "last_name", "email", "phone_number", "avatar"] }] },
                    { model: CategoryModel, attributes: ["id", "name"] }
                ]
            });
            if (!course) throw new ClientError("Course not found", 404);

            logger.info(`Fetched course by id=${req.params.id}`);

            const response = {
                id: course.id,
                name: course.name,
                description: course.description,
                price: course.price,
                level: course.level,
                is_free: course.is_free,
                lesson_count: course.lesson_count,
                instructor: {
                    id: course.Instructor.id,
                    user_id: course.Instructor.user_id,
                    first_name: course.Instructor.User.first_name,
                    last_name: course.Instructor.User.last_name,
                    email: course.Instructor.User.email,
                    phone_number: course.Instructor.User.phone_number,
                    avatar: course.Instructor.User.avatar
                },
                category: { id: course.Category.id, name: course.Category.name },
                createdAt: course.createdAt,
                updatedAt: course.updatedAt
            };

            return res.json({ status: 200, data: response });
        } catch (error) {
            logger.error(`GET_BY_ID error: ${error.message}`);
            return globalError(error, res);
        }
    },

    async UPDATE(req, res) {
        try {
            const course = await CourseModel.findByPk(req.params.id);
            if (!course) throw new ClientError("Course not found", 404);

            const data = req.body;
            await updateCourseSchema.validateAsync(data, { abortEarly: false });

            if (req.user.role === "instructor") {
                const instructor = await InstructorModel.findByPk(data.instructor_id);
                if (!instructor || instructor.user_id !== req.user.user_id) {
                    throw new ClientError("You can only update your own courses", 403);
                }
            }

            if (data.category_id) {
                const category = await CategoryModel.findByPk(data.category_id);
                if (!category) throw new ClientError("Category not found", 404);
                data.category_id = category.id;
            }

            await CourseModel.update(data, { where: { id: course.id } });

            logger.info(`Course updated: id=${course.id}, data=${JSON.stringify(data)}`);

            return res.json({ status: 200, message: "Course updated" });
        } catch (error) {
            logger.error(`UPDATE error: ${error.message}`);
            return globalError(error, res);
        }
    },

    async DELETE(req, res) {
        try {
            const course = await CourseModel.findByPk(req.params.id);
            if (!course) throw new ClientError("Course not found", 404);

            if (req.user.role === "instructor") {
                const instructor = await InstructorModel.findByPk(course.instructor_id);
                if (!instructor || instructor.user_id !== req.user.user_id) {
                    throw new ClientError("You can only delete your own courses", 403);
                }
            }

            await CourseModel.destroy({ where: { id: course.id } });

            logger.info(`Course deleted: id=${course.id}`);

            return res.json({ status: 200, message: "Course deleted" });
        } catch (error) {
            logger.error(`DELETE error: ${error.message}`);
            return globalError(error, res);
        }
    }

};

export default courseController;
