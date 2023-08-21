import Mongoose from "mongoose";
import { useVirtualId } from '../database/database.js';

const userSchema = new Mongoose.Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  url: String,
});

useVirtualId(userSchema);
const User = Mongoose.model('User', userSchema);

export async function create(name, username, password, email, url = "") {
  const newUser = {
    createdAt: new Date(),
    name,
    username,
    password,
    email,
    url,
  };
  return new User(newUser).save().then(data => data.id);
}

export async function get(username) {
  return User.findOne({ username });
}

export async function findById(id) {
  return User.findById(id);
}
