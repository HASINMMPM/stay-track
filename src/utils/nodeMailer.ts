import nodemailer from "nodemailer";
import { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS } from "./env";

// Create transporter with environment variables and set secure to true if SMTP_SECURE is true
const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: false,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

export const sendEmail = async (to: string, subject: string, text: string, html: string) => {
  try {
    const info = await transporter.sendMail({
      from: `"StayTrack" <${SMTP_USER}>`,
      to: to,
      subject: subject,
      text: text, // plain text body
      html: html, // HTML body
    });

    console.log("Message sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: error };
  }
};