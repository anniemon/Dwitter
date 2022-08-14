import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import * as userRepository from "../data/users.js";
const jwtSecret = process.env.jwtSecret;

export async function signup(req, res) {
  const { name, username, password, email, url } = req.body;
  const userExists = await userRepository.get(username);
  if (userExists) {
    return res.status(409).send(`${username} already exists`);
  }
  const hashedPassword = await bcrypt.hashSync(password, 10);
  const userId = await userRepository.create(
    name,
    username,
    hashedPassword,
    email,
    url
  );
  const token = createJwtToken(userId);
  return res.status(201).json({ token, username });
}

export async function login(req, res) {
  const { username, password } = req.body;
  const user = await userRepository.get(username, true);
  if (!user) {
    return res.status(401).send("아이디 또는 비밀번호를 확인해주세요");
  }
  const isMatched = await bcrypt.compareSync(password, user.password);
  if (!isMatched) {
    return res.status(401).send("아이디 또는 비밀번호를 확인해주세요");
  }
  try {
    const token = createJwtToken(user.id);
    res.status(200).json({ token, username });
  } catch (err) {
    console.error(err);
    throw new Error("signing token fails");
  }
}

function createJwtToken(userId) {
  return jwt.sign({ id: userId }, jwtSecret, { expiresIn: "2d" });
}

export async function me(req, res) {
  //* db에 유저가 있는지 확인하는 과정은 생략 가능
  const user = await userRepository.findById(req.userId);
  if (!user) {
    return res.status(404).send(`user does not exist`);
  }
  res.status(200).json({ token: req.token, username: user.username });
}
