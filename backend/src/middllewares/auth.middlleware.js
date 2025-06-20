import redisClient from "../config/redis.js";
import ApiError from "../utils/apiError.js";
import { verifyToken } from "../utils/jwtToken.js";

const decodeUserToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new ApiError(401, "Unauthoriaztion: Token missing  or invalid");
  }

  const token = authHeader.split(" ")[1];

  const isBlackList = await redisClient.get(`blackList:${token}`);

  if (isBlackList) {
    throw new ApiError(401, "Access token is blackisted");
  }

  let decoded;
  try {
    decoded = verifyToken(token, "access");
  } catch (err) {
    throw new ApiError(401, "Unauthorization: Token verifycation failed ");
  }
  req.user = {
    id: decoded.id,
    role: decoded.role,
    accessToken: token,
  };

  next();
};

export default decodeUserToken;
