import * as userService from "../services/user.service.js";
import ApiError from "../utils/apiError.js";
import * as cookie from "../utils/cookie.js";
import * as token from "../utils/jwtToken.js";
import * as passwordUtils from "../utils/password.js";

export const registerUser = async (req, res) => {
  const { email, password } = req.body;

  const existEmail = await userService.checkEmail(email);

  if (existEmail) {
    throw new ApiError(409, "User with this email already exists");
  }

  const hashedPassword = await passwordUtils.hashPassword(password);

  const user = await userService.createUser(email, hashedPassword);

  const { accessToken, refreshToken } = token.createToken({
    id: user.id,
    role: user.role,
  });
  await userService.saveRefreshToken(user.id, refreshToken);
  await cookie.setTokenCookie(res, refreshToken);

  res.status(201).json({
    message: "User created",
    accessToken,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = userService.checkEmail(email);

  if (!user) {
    throw new ApiError(404, "User with this email not found");
  }

  const comarePassword = await passwordUtils.comparePassword(
    currentPassword,
    password
  );

  if (!comarePassword) {
    throw new ApiError(409, "Incorrect passwor");
  }

  const { accessToken, refreshToken } = token.createToken({
    id: user.id,
    role: user.role,
  });
  await userService.saveRefreshToken(user.id, refreshToken);
  await cookie.setTokenCookie(res, refreshToken);

  res.status(200).json({
    message: "Accesss enter",
    accessToken,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
  });
};

export const userlogout = async (req, res) => {
  const userId = req.user.id;

  await userService.clearUserToken(userId);

  await cookie.clearTokenCookie(res);

  res.status(200).json({ message: "User logout succesfully" });
};

export const getNewToken = async (req, res) => {
  const userId = req.user.id;
  const valideRefreshToken = req.cookies.refreshToken;

  const match = await userService.matchToken(userId, valideRefreshToken);

  if (!match) {
    throw new ApiError(403, "Unauhorization: incorrect refresh token");
  }

  const decode = token.verifyToken(valideRefreshToken, "refresh");

  const { accessToken, refreshToken } = token.createToken(decode);

  res.status(200).json({
    message: "Token has been replaced ",
    accessToken,
  });
};
