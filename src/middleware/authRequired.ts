import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../utils/prisma";

type JwtPayload = {
  id: string;
  email: string;
};

declare global {
  namespace Express {
    interface Request {
      teacher: {
        id: string;
        name: string;
        email: string;
      };
    }
  }
}

export const auth = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { authorization } = request.headers;

  if (!authorization) {
    return response
      .status(400)
      .json({ error: "You do not have authorization" });
  }

  const [, token] = authorization.split(" ");

  const { id, email } = jwt.verify(token, "secret_key") as JwtPayload;

  const teacher = await prisma.teacher.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  if (!teacher) {
    return response
      .status(400)
      .json({ error: "You do not have authorization" });
  }

  if (teacher.email !== email) {
    return response
      .status(400)
      .json({ error: "You do not have authorization" });
  }

  request.teacher = teacher;

  next();
};
