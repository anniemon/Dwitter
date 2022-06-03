import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import * as userRepository from "../data/users.js";
import dotenv from "dotenv";
dotenv.config();
const jwtSecret = process.env.jwtSecret;

export async function signup(req, res) {
  const { name, username, password, email, url } = req.body;
  const hashedPassword = await bcrypt.hashSync(password, 10);
  const user = await userRepository.create(
    name,
    username,
    hashedPassword,
    email,
    url
  );
  const token = jwt.sign(user, jwtSecret, { expiresIn: 15 });
  return res.status(201).json({ token: token, username: user.username });
}
export async function login(req, res) {}
export async function me() {}
