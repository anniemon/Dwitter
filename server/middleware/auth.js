import jwt from "jsonwebtoken";
import * as userRepository from "../data/users.js";
import dotenv from "dotenv";
dotenv.config();
const jwtSecret = process.env.jwtSecret;

const AUTH_ERROR = { message: "Authentication Error" };

export const isAuth = async (req, res, next) => {
  const authHeader = req.get("Authorization"); //req.header(field)의 alias
  if (!(authHeader && authHeader.startsWith("Bearer "))) {
    return res.status(401).json(AUTH_ERROR);
  }

  const token = authHeader.split(" ")[1];
  const payload = jwt.verify(token, jwtSecret);
  //* db에 유저가 있는지 확인하는 과정은 생략 가능
  const user = await userRepository.findById(payload.id);
  if (!payload || !user) {
    return res.status(401).json(AUTH_ERROR);
  }
  //* req.customData
  req.userId = user.id;
  req.token = token;
  next();
};
