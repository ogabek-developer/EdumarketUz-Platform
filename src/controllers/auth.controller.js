import { ClientError, globalError } from "shokhijakhon-error-handler";
import {
    changePasswordSchema,
    createUserSchema,
    loginSchema
} from "../utils/validators/user.validator.js";
import { otpGenerator } from "../utils/generators/otp.generator.js";
import hashService from "../lib/hash.service.js";
import { emailService } from "../lib/mail.service.js";
import { resendSchema, verifySchema } from "../utils/validators/otp.validator.js";
import jwtService from "../lib/jwt.service.js";
import generatorTokenData from "../utils/generators/token.data.generator.js";
import { UserModel, RefreshTokenModel } from "../models/index.js";

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

            const user = await UserModel.findOne({ where: { email: data.email } });
            if (!user) throw new ClientError("User not found", 404);

            if (String(user.otp) !== String(data.otp)) {
                throw new ClientError("OTP invalid", 400);
            }

            if (Date.now() > user.otp_time) {
                await UserModel.update(
                    { otp: null, otp_time: null },
                    { where: { email: data.email } }
                );
                throw new ClientError("OTP expired", 400);
            }

            await UserModel.update(
                { is_verified: true, otp: null, otp_time: null },
                { where: { email: data.email } }
            );

            return res.json({ message: "OTP successfully verified", status: 200 });
        } catch (err) {
            return globalError(err, res);
        }
    },

    async RESEND_OTP(req, res) {
        try {
            const data = req.body;
            await resendSchema.validateAsync(data, { abortEarly: false });

            const user = await UserModel.findOne({ where: { email: data.email } });
            if (!user) throw new ClientError("User not found", 404);

            const { otp, otpTime } = otpGenerator();

            await UserModel.update(
                { otp, otp_time: otpTime },
                { where: { email: data.email } }
            );

            await emailService(data.email, otp);

            return res.json({ message: "OTP resent", status: 200 });
        } catch (err) {
            return globalError(err, res);
        }
    },

    async FORGOT_PASSWORD(req, res) {
        try {
            const data = req.body;
            await resendSchema.validateAsync(data, { abortEarly: false });

            const user = await UserModel.findOne({ where: { email: data.email } });
            if (!user) throw new ClientError("User not found", 404);

            const { otp, otpTime } = otpGenerator();
            await emailService(data.email, otp);

            await UserModel.update(
                { otp, otp_time: otpTime, is_verified: false },
                { where: { email: data.email } }
            );

            return res.json({
                message: "OTP sent for password reset",
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

            const user = await UserModel.findOne({ where: { email: data.email } });
            if (!user) throw new ClientError("User not found", 404);

            const hashedPassword = await hashService.hashPassword(data.new_password);

            await UserModel.update(
                { password: hashedPassword },
                { where: { email: data.email } }
            );

            return res.json({ message: "Password changed", status: 200 });
        } catch (err) {
            return globalError(err, res);
        }
    },

    async LOGIN(req, res) {
        try {
            const data = req.body;
            await loginSchema.validateAsync(data, { abortEarly: false });

            const user = await UserModel.findOne({ where: { email: data.email } });
            if (!user) throw new ClientError("Invalid email or password", 401);
            if (!user.is_verified) throw new ClientError("Account not verified", 403);

            const isMatch = await hashService.comparePassword(
                data.password,
                user.password
            );
            if (!isMatch) throw new ClientError("Invalid email or password", 401);

            let tokenData = {
                user_id: user.id,
                role: user.role,
                is_super: false
            };

            tokenData = await generatorTokenData(tokenData, user);

            const accessToken = jwtService.createAccessToken(tokenData);
            const refreshToken = jwtService.createRefreshToken({ user_id: user.id });

            const expiresAt = new Date();
            expiresAt.setDate(expiresAt.getDate() + 30);

            await RefreshTokenModel.create({
                user_id: user.id,
                token: refreshToken,
                expires_at: expiresAt
            });

            res.cookie("refresh_token", refreshToken, jwtService.refreshTokenOptions);

            return res.status(201).json({
                message: "Login successful",
                accessToken,
                status: 201
            });
        } catch (err) {
            return globalError(err, res);
        }
    },

    async REFRESH(req, res) {
        try {
            const refreshToken = req.cookies?.refresh_token;
            if (!refreshToken) throw new ClientError("Refresh token missing", 401);

            const stored = await RefreshTokenModel.findOne({ where: { token: refreshToken } });
            if (!stored) throw new ClientError("Invalid refresh token", 401);

            if (new Date() > stored.expires_at) {
                await RefreshTokenModel.destroy({ where: { id: stored.id } });
                throw new ClientError("Refresh token expired", 401);
            }

            const user = await UserModel.findByPk(stored.user_id);
            if (!user) throw new ClientError("User not found", 404);

            let tokenData = {
                user_id: user.id,
                role: user.role,
                is_super: false
            };

            tokenData = await generatorTokenData(tokenData, user);

            const newAccessToken = jwtService.createAccessToken(tokenData);

            return res.json({
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
