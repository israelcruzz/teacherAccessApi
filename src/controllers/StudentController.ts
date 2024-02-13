import { Request, Response } from "express";
import { z } from "zod";
import StudentRepository from "../repository/StudentRepository";

class StudentController {
    async store(request: Request, response: Response){
        const storeSchemaBody = z.object({
            name: z.string(),
            email: z.string(),
            courseId: z.string().uuid()
        })

        const storeSchemaTeacher = z.object({
            id: z.string().uuid()
        })

        const { name, email, courseId } = storeSchemaBody.parse(request.body)
        const { id } = storeSchemaTeacher.parse(request.teacher)

        const student = await StudentRepository.store({ name, email, courseId, id })

        return response.json(student)
    }
}

export default new StudentController();