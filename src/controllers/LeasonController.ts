import { Request, Response } from "express";
import { z } from "zod";
import nodemailer from "nodemailer";
import LeasonRepository from "../repository/LeasonRepository";

class LeasonController {
  async send(request: Request, response: Response) {
    const sendSchemaBody = z.object({
      title: z.string(),
      description: z.string(),
      courseId: z.string().uuid(),
      teacherId: z.string()
    });

    const sendSchemaTeacher = z.object({
      id: z.string(),
    });

    const { title, description, courseId } = sendSchemaBody.parse(request.body);
    const { id } = sendSchemaTeacher.parse(request.teacher);

    try {
      const students = await LeasonRepository.index(id, courseId);

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_LEASON,
          pass: process.env.PASS_EMAIL,
        },
        tls: {
          rejectUnauthorized: false
        }
      });

      await Promise.all(
        students.map(async (student) => {
          const emailOptions = {
            from: "Teacher Access Leason Platform",
            to: student.email,
            subject: title,
            text: description,
          };

          await transporter.sendMail(emailOptions);
        })
      );

      response.json({ message: 'Leason Sended' })
    } catch (error) {
      response.status(500).json({ error: 'Failed to send emails' });
      console.error("Error sending emails:", error);
        
    }
  }
}

export default new LeasonController();