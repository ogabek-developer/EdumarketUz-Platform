import { ClientError, globalError } from "shokhijakhon-error-handler";
import { changePasswordSchema, createUserSchema, loginSchema } from "../utils/validators/user.validator.js";
import { otpGenerator } from "../utils/generators/otp.generator.js";
import hashService from "../lib/hash.service.js";
import { emailService } from "../lib/mail.service.js";
import { resendSchema, verifySchema } from "../utils/validators/otp.validator.js";
// import { UserModel } from "../models/user/User.model.js";
import jwtService from "../lib/jwt.service.js";
import generatorTokenData from "../utils/generators/token.data.generator.js";
import {  UserModel, RefreshTokenModel } from "../models/index.js";

const authController = {
    async REGISTER(req, res) {
        try {
            const newUser = req.body;

            await createUserSchema.validateAsync(newUser, { abortEarly: false });

            const exists = await UserModel.findOne({ where: { email: newUser.email } });
            if (exists) throw new ClientError("User already exists", 400);

            const { otp, otpTime } = otpGenerator();

            const hashedPassword = await hashService.hashPassword(newUser.password);

            await emailService(newUser.email, otp);

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
    },

    async VERIFY(req, res) {
        try {
            const data = req.body;

            await verifySchema.validateAsync(data, { abortEarly: false });

            const findUser = await UserModel.findOne({ where: { email: data.email } });
            if (!findUser) throw new ClientError('User not found', 404);

            if (String(findUser.otp) !== String(data.otp)) {
                throw new ClientError('OTP invalid', 400);
            }

            const currentDate = Date.now();
            if (currentDate > findUser.otp_time) {
                await UserModel.update({ otp: null, otp_time: null }, { where: { email: data.email } });
                throw new ClientError('OTP expired', 400);
            }

            await UserModel.update(
                { is_verified: true, otp: null, otp_time: null },
                { where: { email: data.email } }
            );

            return res.json({ message: "OTP successfully verified!", status: 200 });

        } catch (err) {
            return globalError(err, res);
        }
    },

    async RESEND_OTP(req, res) {
        try {
            const data = req.body;

            await resendSchema.validateAsync(data, { abortEarly: false });

            const findUser = await UserModel.findOne({ where: { email: data.email } });
            if (!findUser) throw new ClientError('User not found', 404);

            const { otp, otpTime } = otpGenerator();

            await UserModel.update({ otp, otp_time: otpTime }, { where: { email: data.email } });

            await emailService(data.email, otp);

            return res.json({ message: "OTP successfully resent!", status: 200 });

        } catch (err) {
            return globalError(err, res);
        }
    },

    async FORGOT_PASSWORD(req, res) {

        try {
            const data = req.body;

            await resendSchema.validateAsync(data, { abortEarly: false });

            const findUser = await UserModel.findOne({ where: { email: data.email } });
            if (!findUser) throw new ClientError('User not found', 404);

            await UserModel.update({ is_verified: false }, { where: { email: data.email } });

            const { otp, otpTime } = otpGenerator();

            await emailService(data.email, otp);

            await UserModel.update({ otp, otp_time: otpTime }, { where: { email: data.email } });

            return res.json({
                message: "OTP has been sent. Please check your email",
                status: 200
            });

        } catch (err) {
            return globalError(err, res);
        }
    },

    async CHANGE_PASSWORD(req, res) {
        try {
            const data = req.body;

            await changePasswordSchema.validateAsync(data, { abortEarly: false });

            const checkUser = await UserModel.findOne({ where: { email: data.email } });
            if (!checkUser) throw new ClientError('User not found', 404);

            const hashedPassword = await hashService.hashPassword(data.new_password);

            await UserModel.update(
                { password: hashedPassword },
                { where: { email: data.email } }
            );

            return res.json({ message: "Password successfully changed", status: 200 });

        } catch (err) {
            return globalError(err, res);
        }
    },


    async LOGIN(req, res) {
        try {
            const data = req.body;
            await loginSchema.validateAsync(data, { abortEarly: false });

            const findUser = await UserModel.findOne({ where: { email: data.email } });
            if (!findUser) throw new ClientError("Invalid email or password", 401);
            if (!findUser.is_verified) throw new ClientError("Please verify your account first", 403);

            const isMatch = await hashService.comparePassword(data.password, findUser.password);
            if (!isMatch) throw new ClientError("Invalid email or password", 401);

            let tokenData = {
                user_id: findUser.id,
                role: findUser.role,
                is_admin: false,
                is_super: false,
                is_student: false,
                is_instructor: false
            };

            tokenData = await generatorTokenData(tokenData, findUser);

            switch (findUser.role) {
                case "student":
                    tokenData.is_student = true;
                    break;
                case "instructor":
                    tokenData.is_instructor = true;
                    break;
                case "admin":
                    tokenData.is_admin = true;
                    break;
                case "super_admin":
                    tokenData.is_super = true;
                    tokenData.is_admin = true;
                    break;
            }

            const accessToken = jwtService.createAccessToken(tokenData);
            const refreshToken = jwtService.createRefreshToken({ user_id: findUser.id });

            const expiresAt = new Date();
            expiresAt.setDate(expiresAt.getDate() + 30);
            await RefreshTokenModel.create({
                user_id: findUser.id,
                token: refreshToken,
                expires_at: expiresAt
            });

            res.cookie("refresh_token", refreshToken, jwtService.refreshTokenOptions);

            return res.status(201).json({
                message: "User logged in successfully!",
                accessToken,
                status: 201
            });

        } catch (err) {
            return globalError(err, res);
        }
    },

    async REFRESH(req, res) {
    try {
        const accessToken = req.headers?.authorization?.split(" ")[1] || null;
        const refreshToken = req.cookies?.refresh_token;

        if (!refreshToken) throw new ClientError("Refresh token not found", 401);

        if (accessToken) {
            try {
                jwtService.parseAccessToken(accessToken);
                return res.status(200).json({
                    message: "Access token still valid",
                    accessToken,
                    status: 200
                });
            } catch (err) {
                if (err.name !== "TokenExpiredError") throw err;
            }
        }

        const storedToken = await RefreshTokenModel.findOne({ where: { token: refreshToken } });
        if (!storedToken) throw new ClientError("Invalid refresh token", 401);

        const now = new Date();
        if (now > storedToken.expires_at) {
            await RefreshTokenModel.destroy({ where: { id: storedToken.id } });
            throw new ClientError("Refresh token expired", 401);
        }

        const user = await UserModel.findByPk(storedToken.user_id);
        if (!user) throw new ClientError("User not found", 404);

        let tokenData = {
            user_id: user.id,
            role: user.role,
            is_admin: false,
            is_super: false,
            is_student: false,
            is_instructor: false
        };

        tokenData = await generatorTokenData(tokenData, user);

        switch (user.role) {
            case "student":
                tokenData.is_student = true;
                break;
            case "instructor":
                tokenData.is_instructor = true;
                break;
            case "admin":
                tokenData.is_admin = true;
                break;
            case "super_admin":
                tokenData.is_super = true;
                tokenData.is_admin = true;
                break;
        }

        const newAccessToken = jwtService.createAccessToken(tokenData);

        return res.status(200).json({
            message: "Access token refreshed",
            accessToken: newAccessToken,
            status: 200
        });

    } catch (err) {
        return globalError(err, res);
    }
}



};

export default authController;




