import { Request, Response } from "express";
import { z } from "zod";
import StudentRepository from "../repository/StudentRepository";

class StudentController {
  async index(request: Request, response: Response) {
    const indexSchemaQuery = z.object({
      orderBy: z.any(),
      courseId: z.any(),
    });

    const indexSchemaTeacher = z.object({
      id: z.string().uuid(),
    });

    const { orderBy, courseId } = indexSchemaQuery.parse(request.query);
    const { id } = indexSchemaTeacher.parse(request.teacher);

    const studant = await StudentRepository.index(orderBy, courseId, id);

    return response.json(studant);
  }

  async store(request: Request, response: Response) {
    const storeSchemaBody = z.object({
      name: z.string(),
      email: z.string(),
      courseId: z.string().uuid(),
    });

    const storeSchemaTeacher = z.object({
      id: z.string().uuid(),
    });

    const storeSchemaFile = z.object({
      path: z.string(),
    });

    const { name, email, courseId } = storeSchemaBody.parse(request.body);
    const { id } = storeSchemaTeacher.parse(request.teacher);
    const { path } = storeSchemaFile.parse(request.file);

    const student = await StudentRepository.store({
      name,
      email,
      courseId,
      id,
      path,
    });

    return response.json(student);
  }

  async show(request: Request, response: Response) {
    const showSchemaBody = z.object({
      name: z.string(),
    });

    const showSchemaTeacher = z.object({
      id: z.string().uuid(),
    });

    const { name } = showSchemaBody.parse(request.body);
    const { id } = showSchemaTeacher.parse(request.teacher);

    const studant = await StudentRepository.show(name, id);

    return response.json(studant);
  }

  async update(request: Request, response: Response) {
    const updateSchemaParams = z.object({
      studentId: z.string().uuid(),
    });

    const updateSchemaBody = z.object({
      name: z.string(),
      email: z.string(),
      courseId: z.string().uuid(),
    });

    const updateSchemaTeacher = z.object({
      id: z.string().uuid(),
    });

    const updateSchemaFile = z.object({
      path: z.string(),
    });

    const { studentId } = updateSchemaParams.parse(request.params);
    const { name, email, courseId } = updateSchemaBody.parse(request.body);
    const { id } = updateSchemaTeacher.parse(request.teacher);
    const { path } = updateSchemaFile.parse(request.file);

    const studantExist = await StudentRepository.findStudentByIdAndTeacherId(
      studentId,
      id
    );

    if (!studantExist) {
      return response.json({ error: "Studant Not Exist" });
    }

    const student = await StudentRepository.update({
      name,
      email,
      courseId,
      id: studentId,
      teacherId: id,
      path,
    });

    return response.json(student);
  }

  async delete(request: Request, response: Response) {
    const deleteSchemaParams = z.object({
      studentId: z.string().uuid(),
    });

    const { studentId } = deleteSchemaParams.parse(request.params);

    await StudentRepository.delete(studentId);

    return response.json({ message: "Student Deleted" });
  }
}

export default new StudentController();
