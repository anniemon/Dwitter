import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import * as userRepository from "../data/users.js";
import dotenv from "dotenv";
dotenv.config();
const jwtSecret = process.env.jwtSecret;

export async function signup(req, res) {
  const { name, username, password, email, url } = req.body;
  const userExists = await userRepository.get(username);
  if (userExists) {
    return res.status(409).send(`${username} already exists`);
  }
  const hashedPassword = await bcrypt.hashSync(password, 10);
  const user = await userRepository.create(
    name,
    username,
    hashedPassword,
    email,
    url
  );
  const token = createJwtToken(user);
  return res.status(201).json({ token: token, username: user.username });
}

export async function login(req, res) {
  const { username, password } = req.body;
  const user = await userRepository.get(username, true);
  if (!user) {
    return res.status(403).send("아이디 또는 비밀번호를 확인해주세요");
  }
  const isMatched = await bcrypt.compareSync(password, user.password);
  if (!isMatched) {
    return res.status(403).send("아이디 또는 비밀번호를 확인해주세요");
  }
  try {
    const token = createJwtToken(user);
    res.status(200).json({ token: token, username: user.username });
  } catch (err) {
    console.error(err);
    throw new Error("signing token fails");
  }
}

function createJwtToken(user) {
  return jwt.sign(user, jwtSecret, { expiresIn: `2d` });
}

export async function me(req, res) {
  const token = req.headers["authorization"].split(" ")[1];
  const payload = jwt.verify(token, jwtSecret);
  try {
    res.status(200).json({ token: token, username: payload.username });
  } catch (err) {
    console.error(err);
  }
}
