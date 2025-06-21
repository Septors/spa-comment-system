import prisma from "../lib/prisma";
import { createToken } from "../utils/jwtToken.js";

export const checkTypeUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const { userName, email } = req.body;
  let user;
  if (authHeader) {
    next();
  } else {
    user = await prisma.user.create({
      data: {
        userName,
        email,
      },
    });
  }

  const { accessToken, refreshToken } = createToken({
    id: user.id,
    role: user.role,
  });

  res.status(201).json({ message: "Guest user create", accessToken });
  next();
};
