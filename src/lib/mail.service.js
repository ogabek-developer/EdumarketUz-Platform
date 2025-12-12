
import { config } from "dotenv";
config()
import nodemailer from "nodemailer"

const emailService = async (email, otp) => {
    const transport = nodemailer.createTransport({
        service: "gmail",
        auth:{
            user: process.env.MY_EMAIL,
            pass: process.env.MY_EMAIL_PASS
        }
    });
    await transport.sendMail({
        from: process.env.MY_EMAIL,
        to: email,
        subject: "Library email verify",
        text: `OTP:${otp}, ushbu password faqat 2 daqiqa amal qiladi ulgursang ulgurding !`
    });
};

export default emailService;