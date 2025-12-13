import { ClientError, globalError } from "shokhijakhon-error-handler";
import { createUserSchema } from "../utils/validators/user.validator.js";
import UserModel from "../models/user/User.model.js";
import { otpGenerator } from "../utils/generators/otp.generator.js";
import hashService from "../lib/hash.service.js";
import { emailService } from "../lib/mail.service.js";


const authController = {
    async REGISTER(req, res) {
        try {
            const newUser = req.body;

            await createUserSchema.validateAsync(newUser, { abortEarly: false });

            const exists = await UserModel.findOne({
                where: { email: newUser.email }
            });
            if (exists) {
                throw new ClientError("User already exists", 400);
            }

            const { otp, otpTime } = otpGenerator();

            const hashedPassword = await hashService.hashPassword(newUser.password);

            await emailService(newUser.email, otp)

            await UserModel.create({
                ...newUser,
                password: hashedPassword,
                otp,
                otp_time: otpTime
            });

            return res.status(201).json({
                message: "User successfully registered",
                status: 201
            });
        } catch (err) {
            return globalError(err, res);
        }
    }
};

export default authController;
