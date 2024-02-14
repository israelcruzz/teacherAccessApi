import { prisma } from "../utils/prisma";

class CourseRepository {
  async index() {
    return await prisma.course.findMany();
  }

  async store(name: string) {
    const course = await prisma.course.create({
      data: {
        name,
      },
    });

    return course;
  }

  async show(name: string){
    const course = await prisma.course.findFirst({
      where: {
        name
      }
    })

    return course
  }
}

export default new CourseRepository();
