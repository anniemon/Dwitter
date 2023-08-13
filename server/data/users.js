import MongoDb from "mongodb";
import { getUsers } from '../database/database.js';

export async function create(name, username, password, email, url = "") {
  const newUser = {
    createdAt: new Date(),
    name,
    username,
    password,
    email,
    url,
  };
  return getUsers().insertOne(newUser).then(data => data.insertedId.toString());
}

export async function get(username, requirePassword = false) {
  const user = getUsers().findOne({ username }).then(mapOptionalUser);
  if(!user) return null;
  if (requirePassword) {
    return user;
  }
  delete user.password;
  return user;
}

export async function findById(id) {
  const user = getUsers().findOne({ _id : new MongoDb.ObjectId(id) }).then(mapOptionalUser);
  if (!user) return null;
  delete user.password;
  return user;
}

const mapOptionalUser = (user) => {
  return user ? {...user, id: user._id.toString() } : user;
}
