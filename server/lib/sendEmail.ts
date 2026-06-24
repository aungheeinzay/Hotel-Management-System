import nodeMailer from "nodemailer"
import SMTPTransport from 'nodemailer/lib/smtp-transport';
type EmailOptions={
    customerEmail:string,
    subject:string,
    body:string
}


// Create a transporter using SMTP
const transporter = nodeMailer.createTransport({
    host:process.env.SMTP_HOST,
    port:Number( process.env.SMTP_PORT),
    // use STARTTLS (upgrade connection to TLS after connecting)
    auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
    },
});



export const sendEmail = async (option:EmailOptions)=>{
    const message = {
        from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
        to: option.customerEmail,
        subject: option.subject,
        html: option.body,
    };
    await transporter.sendMail(message)
}