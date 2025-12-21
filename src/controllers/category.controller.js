import { ClientError, globalError } from "shokhijakhon-error-handler";
import { CategoryModel } from "../models/index.js";
import {
    createCategorySchema,
    updateCategorySchema
} from "../utils/validators/category.validator.js";
import logger from "../utils/logger.js";

const categoryController = {

    async CREATE(req, res) {
        try {
            const data = req.body;
            await createCategorySchema.validateAsync(data, { abortEarly: false });

            const exists = await CategoryModel.findOne({
                where: { name: data.name }
            });
            if (exists) throw new ClientError("Category already exists", 400);

            const category = await CategoryModel.create(data);

            logger.info(`Category created: name=${data.name}`);

            return res.status(201).json({
                message: "Category created",
                data: category,
                status: 201
            });
        } catch (error) {
            logger.error(`CREATE error: ${error.message}`);
            return globalError(error, res);
        }
    },

    async GET_ALL(req, res) {
        try {
            const categories = await CategoryModel.findAll();

            logger.info(`Fetched all categories, count=${categories.length}`);

            return res.json({
                message: "Categories list",
                data: categories,
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

            const category = await CategoryModel.findByPk(id);
            if (!category) throw new ClientError("Category not found", 404);

            logger.info(`Fetched category by id=${id}`);

            return res.json({
                message: "Category",
                data: category,
                status: 200
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

            await updateCategorySchema.validateAsync(data, { abortEarly: false });

            const category = await CategoryModel.findByPk(id);
            if (!category) throw new ClientError("Category not found", 404);

            await CategoryModel.update(data, { where: { id } });

            logger.info(`Category updated: id=${id}, data=${JSON.stringify(data)}`);

            return res.json({
                message: "Category updated",
                status: 200
            });
        } catch (error) {
            logger.error(`UPDATE error: ${error.message}`);
            return globalError(error, res);
        }
    },

    async DELETE(req, res) {
        try {
            const { id } = req.params;

            const category = await CategoryModel.findByPk(id);
            if (!category) throw new ClientError("Category not found", 404);

            await CategoryModel.destroy({ where: { id } });

            logger.info(`Category deleted: id=${id}`);

            return res.json({
                message: "Category deleted",
                status: 200
            });
        } catch (error) {
            logger.error(`DELETE error: ${error.message}`);
            return globalError(error, res);
        }
    }

};

export default categoryController;
