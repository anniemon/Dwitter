import jwt from "jsonwebtoken";
import * as userRepository from "../data/users.js";
import { config } from "../config.js";

const AUTH_ERROR = { message: "Authentication Error" };

export const isAuth = async (req, res, next) => {
  const authHeader = req.get("Authorization"); //req.header(field)의 alias
  if (!(authHeader && authHeader.startsWith("Bearer "))) {
    return res.status(401).json(AUTH_ERROR);
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, config.jwt.secretKey, async (err, decoded) => {
    if (err) {
      return res.status(401).json(AUTH_ERROR);
    }
    //* db에 유저가 있는지 확인하는 과정은 생략 가능
    const user = await userRepository.findById(decoded.id);
    if (!user) {
      return res.status(401).json(AUTH_ERROR);
    }
    //* req.customData
    req.userId = user.id;
    req.token = token;
    next();
  });
};
