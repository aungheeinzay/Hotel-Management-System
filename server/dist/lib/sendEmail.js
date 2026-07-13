import nodeMailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config({
    path: ".env.local"
});
const transporter = nodeMailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
    },
});
export const sendEmail = async (option) => {
    const message = {
        from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
        to: option.customerEmail,
        subject: option.subject,
        html: option.body,
    };
    await transporter.sendMail(message);
};
