import { prisma } from "../utils/prisma";

interface StudentProps {
  name: string;
  email: string;
  courseId: string;
  id: string;
  teacherId?: string;
  path?: string;
}

class StudentRepository {
  async index(orderBy: any, courseId: any, teacherId: string) {
    if (courseId === "all") {
      return await prisma.student.findMany({
        where: {
          teacherId,
        },
        include: {
          course: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: {
          name: orderBy,
        },
      });
    } else {
      return await prisma.student.findMany({
        where: {
          teacherId,
          courseId,
        },
        include: {
          course: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: {
          name: orderBy,
        },
      });
    }
  }

  async show(name: string, teacherId: string) {
    await prisma.student.findMany({
      where: {
        name,
        teacherId,
      },
    });
  }

  async store({ name, email, courseId, id, path }: StudentProps) {
    const newStudent = await prisma.student.create({
      data: {
        name,
        email,
        courseId,
        teacherId: id,
        image: path,
      },
      include: {
        course: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return newStudent;
  }

  async update({ name, email, courseId, id, teacherId, path }: StudentProps) {
    const student = await prisma.student.update({
      where: {
        id,
        teacherId,
      },
      data: {
        name,
        email,
        courseId,
        image: path,
      },
      include: {
        course: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return student;
  }

  async delete(id: string) {
    return await prisma.student.delete({
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
