import prisma from "../lib/prisma.js";
import ApiError from "../utils/apiError.js";

export const checkEmail = async (email) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const createUser = async (email, hashedPassword) => {
  return await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });
};

export const saveRefreshToken = async (userId, token) => {
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      currentTefreshToken: token,
    },
  });
};

export const getUserById = async (id) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
};

export const clearUserToken = async (id) => {
  await prisma.user.update({
    where: {
      id,
    },
  });
};

export const getUserValideToken = async (id) => {
  const userToken = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      currentRefreshToken: true,
    },
  });

  if (!userToken) {
    throw new ApiError(403, "Unauthorization: user havn't valide token");
  }
  return userToken.currentTefreshToken;
};

export const matchToken = async (id, currentToken) => {
  const validToken = await getUserValideToken(id);
  return validToken === currentToken ? validToken : false;
};
