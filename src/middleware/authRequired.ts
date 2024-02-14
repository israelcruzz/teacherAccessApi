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
      .status(401)
      .json({ error: "Authorization header is missing" });
  }

  const [, token] = authorization.split(" ");

  try {
    const decodedToken = jwt.verify(token, "secret_key") as JwtPayload;

    const { id, email } = decodedToken;

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

    if (!teacher || teacher.email !== email) {
      throw new Error("Invalid token or user not found");
    }

    request.teacher = teacher;

    next();
  } catch (error) {
    console.error("Error while verifying JWT token:", error);
    return response.status(401).json({ error: "Invalid or expired token" });
  }
};
