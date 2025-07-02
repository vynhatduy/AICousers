import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export async function sendContactMail(data) {
  const transporter = nodemailer.createTransport({
    // for test with gmail
    service: "gmail",

    // for deploy with smtp mail
    // host: process.env.SMTP_HOST,
    // port: Number(process.env.SMTP_PORT),
    // secure: process.env.SMTP_SECURE === "true",

    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: process.env.SMTP_USER,
    subject: data.subject,
    text: `
      Họ tên: ${data.name}
      Email: ${data.email}
      Số điện thoại: ${data.phone}
      Vị trí: ${data.position}
      Công ty: ${data.company}
    `,
  });
  return info;
}
