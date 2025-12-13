import { ClientError, globalError } from "shokhijakhon-error-handler";
import { createUserSchema } from "../utils/validators/user.validator.js";
import { otpGenerator } from "../utils/generators/otp.generator.js";
import hashService from "../lib/hash.service.js";
import { emailService } from "../lib/mail.service.js";
import { verifySchema } from "../utils/validators/otp.validator.js";
import { UserModel } from "../models/index.js";

const authController = {
  async REGISTER(req, res) {
    try {
      const newUser = req.body;

      // Validation
      await createUserSchema.validateAsync(newUser, { abortEarly: false });

      // Check if user exists
      const exists = await UserModel.findOne({ where: { email: newUser.email } });
      if (exists) throw new ClientError("User already exists", 400);

      // Generate OTP
      const { otp, otpTime } = otpGenerator();

      // Hash password
      const hashedPassword = await hashService.hashPassword(newUser.password);

      // Send OTP email
      await emailService(newUser.email, otp);

      // Create user
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

      // Validate input
      await verifySchema.validateAsync(data, { abortEarly: false });

      // Find user
      const findUser = await UserModel.findOne({ where: { email: data.email } });
      if (!findUser) throw new ClientError('User not found', 404);

      // Compare OTP (string vs number)
      if (String(findUser.otp) !== String(data.otp)) {
        throw new ClientError('OTP invalid', 400);
      }

      // Check OTP expiration
      const currentDate = Date.now();
      if (currentDate > findUser.otp_time) {
        await UserModel.update({ otp: null, otp_time: null }, { where: { email: data.email } });
        throw new ClientError('OTP expired', 400);
      }

      // Set user verified & clean OTP
      await UserModel.update(
        { is_verified: true, otp: null, otp_time: null },
        { where: { email: data.email } }
      );

      return res.json({ message: "OTP successfully verified!", status: 200 });

    } catch (err) {
      return globalError(err, res);
    }
  },
};

export default authController;
