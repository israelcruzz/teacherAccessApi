import { prisma } from "../utils/prisma";

interface StudentProps {
  name: string;
  email: string;
  courseId: string;
  id: string;
}

class StudentRepository {
  async index() {}

  async show() {}

  async store({ name, email, courseId, id }: StudentProps) {
    const newStudent = await prisma.student.create({
        data: {
            name,
            email,
            courseId,
            teacherId: id
        }
    })

    return newStudent
  }

  async update() {}
  async delete() {}
}

export default new StudentRepository();
