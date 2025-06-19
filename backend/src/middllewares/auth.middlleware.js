import ApiError from "../utils/apiError.js";
import { verifyToken } from "../utils/jwtToken.js";

const decodeUserToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new ApiError(401, "Unauthoriaztion: Token missing  or invalid");
  }

  const token = authHeader.split(" ")[1];
  let decoded;
  try {
    decoded = verifyToken(token, "access");
  } catch (err) {
    throw new ApiError(401, "Unauthorization: Token verifycation failed ");
  }
  req.user = {
    id: decoded.id,
    role: decoded.role,
  };

  next();
};

export default decodeUserToken;
