import { ClientError, globalError } from "shokhijakhon-error-handler";
import { LessonModel, CourseModel, InstructorModel, UserModel } from "../models/index.js";
import { createLessonSchema, updateLessonSchema } from "../utils/validators/lesson.validator.js";
import { uploadVideo, deleteVideo } from "../lib/cloudinary.service.js";
import logger from "../utils/logger.js";

const lessonController = {
  async CREATE(req, res) {
    try {
      await createLessonSchema.validateAsync(req.body, { abortEarly: false });

      if (!req.file) throw new ClientError("Video file majburiy", 400);

      const course = await CourseModel.findByPk(req.body.course_id);
      if (!course) throw new ClientError("Course not found", 404);

      const instructor = await InstructorModel.findOne({ where: { user_id: req.user.user_id } });
      if (!instructor || instructor.id !== course.instructor_id) throw new ClientError("Instructor only", 403);

      const { url, id } = await uploadVideo(req.file.path);

      const lesson = await LessonModel.create({
        course_id: course.id,
        title: req.body.title,
        duration: req.body.duration,
        video_url: url,
        video_id: id
      });

      logger.info(`Lesson created: id=${lesson.id}, course_id=${course.id}, instructor_id=${instructor.id}`);

      return res.status(201).json({ status: 201, data: lesson });
    } catch (error) {
      logger.error(`CREATE error: ${error.message}`);
      return globalError(error, res);
    }
  },

  async GET_ALL(req, res) {
    try {
      const lessons = await LessonModel.findAll({ include: [{ model: CourseModel }] });

      logger.info(`Fetched all lessons, count=${lessons.length}`);

      return res.json({ status: 200, data: lessons });
    } catch (error) {
      logger.error(`GET_ALL error: ${error.message}`);
      return globalError(error, res);
    }
  },

  async GET_BY_ID(req, res) {
    try {
      const lesson = await LessonModel.findByPk(req.params.id, { include: [{ model: CourseModel }] });
      if (!lesson) throw new ClientError("Lesson not found", 404);

      logger.info(`Fetched lesson by id=${req.params.id}`);

      return res.json({ status: 200, data: lesson });
    } catch (error) {
      logger.error(`GET_BY_ID error: ${error.message}`);
      return globalError(error, res);
    }
  },

  async UPDATE(req, res) {
    try {
      const lesson = await LessonModel.findByPk(req.params.id);
      if (!lesson) throw new ClientError("Lesson not found", 404);

      const course = await CourseModel.findByPk(lesson.course_id);
      if (!course) throw new ClientError("Course not found", 404);

      const instructor = await InstructorModel.findOne({ where: { user_id: req.user.user_id } });

      if (req.user.role === "instructor" && instructor.id !== course.instructor_id) {
        throw new ClientError("You can only update your own lessons!", 403);
      }

      await updateLessonSchema.validateAsync(req.body, { abortEarly: false });

      if (req.file) {
        if (lesson.video_id) await deleteVideo(lesson.video_id);

        const { url, id } = await uploadVideo(req.file.path);
        req.body.video_url = url;
        req.body.video_id = id;
      }

      await LessonModel.update(req.body, { where: { id: lesson.id } });

      logger.info(`Lesson updated: id=${lesson.id}, course_id=${course.id}, instructor_id=${instructor.id}`);

      return res.json({ status: 200, message: "Lesson updated" });
    } catch (error) {
      logger.error(`UPDATE error: ${error.message}`);
      return globalError(error, res);
    }
  },

  async DELETE(req, res) {
    try {
      const lesson = await LessonModel.findByPk(req.params.id);
      if (!lesson) throw new ClientError("Lesson not found", 404);

      const course = await CourseModel.findByPk(lesson.course_id);
      const instructor = await InstructorModel.findOne({ where: { user_id: req.user.user_id } });

      if (req.user.role === "instructor" && instructor.id !== course.instructor_id) {
        throw new ClientError("You can only delete your own lessons!", 403);
      }

      if (lesson.video_id) await deleteVideo(lesson.video_id);

      await LessonModel.destroy({ where: { id: lesson.id } });

      logger.info(`Lesson deleted: id=${lesson.id}, course_id=${course.id}, instructor_id=${instructor.id}`);

      return res.json({ status: 200, message: "Lesson deleted" });
    } catch (error) {
      logger.error(`DELETE error: ${error.message}`);
      return globalError(error, res);
    }
  }
};

export default lessonController;
