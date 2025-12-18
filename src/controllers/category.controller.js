import { ClientError, globalError } from "shokhijakhon-error-handler";
import { CategoryModel } from "../models/index.js";
import {
    createCategorySchema,
    updateCategorySchema
} from "../utils/validators/category.validator.js";

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

            return res.status(201).json({
                message: "Category created",
                data: category,
                status: 201
            });
        } catch (error) {
            return globalError(error, res);
        }
    },

    async GET_ALL(req, res) {
        try {
            const categories = await CategoryModel.findAll();
            console.log(categories)
            return res.json({
                message: "Categories list",
                data: categories,
                status: 200
            });
        } catch (error) {
            return globalError(error, res);
        }
    },

    async GET_BY_ID(req, res) {
        try {
            const { id } = req.params;

            const category = await CategoryModel.findByPk(id);
            if (!category) throw new ClientError("Category not found", 404);

            return res.json({
                message: "Category",
                data: category,
                status: 200
            });
        } catch (error) {
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

            return res.json({
                message: "Category updated",
                status: 200
            });
        } catch (error) {
            return globalError(error, res);
        }
    },

    async DELETE(req, res) {
        try {
            const { id } = req.params;

            const category = await CategoryModel.findByPk(id);
            if (!category) throw new ClientError("Category not found", 404);

            await CategoryModel.destroy({ where: { id } });

            return res.json({
                message: "Category deleted",
                status: 200
            });
        } catch (error) {
            return globalError(error, res);
        }
    }

};

export default categoryController;
