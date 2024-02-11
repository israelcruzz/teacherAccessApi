import { prisma } from "../utils/prisma";

interface TeacherRepositoryProps {
  name: string;
  email: string;
  hashpassword: string;
}

interface TeacherProps {
  id: string;
  name: string;
  email: string;
}

class TeacherRepository {
  async index() {
    return await prisma.teacher.findMany();
  }

  async store({ name, email, hashpassword }: TeacherRepositoryProps) {
    const newTeacher = await prisma.teacher.create({
      data: {
        name,
        email,
        password: hashpassword,
      },
    });

    return newTeacher;
  }

  async login(email: string) {
    const teacher = await prisma.teacher.findUnique({
      where: {
        email,
      },
    });

    return teacher;
  }

  async findByEmail(email: string) {
    const teacher = await prisma.teacher.findUnique({
      where: {
        email,
      },
    });

    return teacher;
  }

  async findById(id: string) {
    const teacher = await prisma.teacher.findUnique({
      where: {
        id,
      },
    });

    return teacher;
  }

  async delete(id: string) {
    await prisma.teacher.delete({
      where: {
        id,
      },
    });
  }

  async update({ id, name, email }: TeacherProps) {
    const teacher = await prisma.teacher.update({
      where: {
        id,
      },
      data: {
        name,
        email,
      },
    });

    return teacher
  }
}

export default new TeacherRepository();
