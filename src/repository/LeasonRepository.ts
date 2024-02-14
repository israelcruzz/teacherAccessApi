import { prisma } from "../utils/prisma";

class LeasonRepository {
    async index(teacherId: string, courseId: string){
        const students = await prisma.student.findMany({
            where: {
                teacherId,
                courseId
            }
        })

        return students
    }
}

export default new LeasonRepository();