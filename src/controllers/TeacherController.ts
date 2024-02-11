import { Request, Response } from "express";
import { z } from "zod";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import TeacherRepository from "../repository/TeacherRepository";

class TeacherController {
  async index(request: Request, response: Response) {
    const teachers = await TeacherRepository.index();

    return response.json(teachers);
  }

  async store(request: Request, response: Response) {
    const registerSchema = z.object({
      name: z.string(),
      email: z.string(),
      password: z.string(),
    });

    const { name, email, password } = registerSchema.parse(request.body);

    const hashpassword = await bcrypt.hash(password, 10);

    const teacherExist = await TeacherRepository.findByEmail(email);

    if (teacherExist) {
      return response
        .status(409)
        .json({ error: "This email is already in use" });
    }

    const teacher = await TeacherRepository.store({
      name,
      email,
      hashpassword,
    });

    return response.json({ message: "Teacher Created!", teacher });
  }

  async login(request: Request, response: Response) {
    const loginSchema = z.object({
      email: z.string(),
      password: z.string(),
    });

    const { email, password } = loginSchema.parse(request.body);

    const teacher = await TeacherRepository.login(email);
    if (!teacher) {
      return response
        .status(400)
        .json({ error: "Incorrect username or password" });
    }

    const passwordMatch = await bcrypt.compare(password, teacher.password);
    if (!passwordMatch) {
      return response
        .status(400)
        .json({ error: "Incorrect username or password" });
    }

    const id = teacher.id;

    const token = jwt.sign({ id, email }, "secret_key", {
      expiresIn: 30 * 24 * 60 * 60,
    });

    response.json({ token });
  }

  async update(request: Request, response: Response) {
    const updateSchemaId = z.object({
      id: z.string().uuid(),
    });

    const updateSchemaBody = z.object({
      name: z.string(),
      email: z.string(),
    });

    const { id } = updateSchemaId.parse(request.teacher);
    const { name, email } = updateSchemaBody.parse(request.body);

    const teacherValid = await TeacherRepository.findById(id);

    if (!teacherValid) {
      return response.status(400).json({ error: "ID Teacher Invalid" });
    }

    const teacher = await TeacherRepository.update({ id, name, email });
    
    return response.json(teacher);
  }

  async delete(request: Request, response: Response) {
    const deleteSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = deleteSchema.parse(request.teacher);

    if (!id) {
      return response.json({ error: "Incorrect ID, check if it was sent" });
    }

    await TeacherRepository.delete(id);

    return response.json({ message: "Teacher Deleted" });
  }
}

export default new TeacherController();