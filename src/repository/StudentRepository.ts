import { prisma } from "../utils/prisma";

interface StudentProps {
  name: string;
  email: string;
  courseId: string;
  id: string;
  teacherId?: string;
}

class StudentRepository {
  async index(orderBy: any, courseId: string, teacherId: string) {
    if (courseId === "all") {
      return await prisma.student.findMany({
        where: {
          teacherId,
        },
        orderBy,
      });
    } else {
      return await prisma.student.findMany({
        where: {
          teacherId,
          courseId,
        },
        orderBy,
      });
    }
  }

  async show(name: string) {
    await prisma.student.findMany({
      where: {
        name
      }
    })
  }

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

  async update({ name, email, courseId, id, teacherId }: StudentProps) {
    const student = await prisma.student.update({
      where: {
        id,
        teacherId,
      },
      data: {
        name,
        email,
        courseId,
      },
    });

    return student;
  }

  async delete(id: string, teacherId: string) {
    await prisma.student.delete({
      where: {
        id,
        teacherId
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
