import { prisma } from "../utils/prisma";

interface StudentProps {
  name: string;
  email: string;
  courseId: string;
  id: string;
}

class StudentRepository {
  async index(orderBy: any, courseId: string) {
    if (courseId === "all") {
      return await prisma.student.findMany({ orderBy });
    } else {
      return await prisma.student.findMany({
        where: {
          courseId,
        },
        orderBy,
      });
    }
  }

  async show(){}

  async store({ name, email, courseId, id }: StudentProps) {
    const newStudent = await prisma.student.create({
      data: {
        name,
        email,
        courseId,
        teacherId: id,
      },
    });

    return newStudent;
  }

  async update({ name, email, courseId, id }: StudentProps) {
    const student = await prisma.student.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        courseId,
      },
    });

    return student;
  }

  async delete(id: string) {
    await prisma.student.delete({
      where: {
        id,
      },
    });
  }

  async findStudentByIdAndTeacherId(studentId: string, teacherId: string) {
    const student = await prisma.student.findUnique({
      where: {
        id: studentId,
        teacherId,
      },
    });

    return student;
  }
}

export default new StudentRepository();