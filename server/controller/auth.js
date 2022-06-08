import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as userRepository from '../data/users.js';
import dotenv from 'dotenv';
dotenv.config();
const jwtSecret = process.env.jwtSecret;

export async function signup(req, res) {
  //TODO: username 중복검사
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

export async function login(req, res) {
  const { username, password } = req.body;
  const hash = await userRepository.getHash(username);
  const isMatched = await bcrypt.compareSync(password, hash);
  if (!isMatched) {
    return res.status(403).send('아이디 또는 비밀번호를 확인해주세요');
  } else {
    const user = await userRepository.get(username);
    const token = jwt.sign(user, jwtSecret, { expiresIn: 15 });
    res.status(200).json({ token: token, username: user.username });
  }
}

export async function me(req, res) {
  const token = req.headers['authorization'].split(' ')[1];
  const payload = jwt.verify(token, jwtSecret);
  try {
    res.status(200).json({ token: token, username: payload.username });
  } catch (err) {
    console.error(err);
  }
}
