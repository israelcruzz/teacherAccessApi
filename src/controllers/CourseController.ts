import { Request, Response } from "express";
import CourseRepository from "../repository/CourseRepositorie";
import { z } from "zod";

class CourseController {
  async index(request: Request, response: Response) {
    const courses = await CourseRepository.index();

    return response.json(courses);
  }

  async store(request: Request, response: Response) {
    const storeSchema = z.object({
      name: z.string(),
    });

    const { name } = storeSchema.parse(request.body);

    const courseExist = await CourseRepository.show(name);

    if (courseExist) {
      return response.send(404).json({ error: "Name in use" });
    }

    const newCourse = await CourseRepository.store(name);

    return response.json(newCourse);
  }
}

export default new CourseController();
