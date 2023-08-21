import * as userRepository from "../data/users.js";
import Mongoose from "mongoose";
import { useVirtualId } from '../database/database.js'

const tweetSchema = new Mongoose.Schema(
  {
  text: { type: String, required: true },
  userId: { type: String, required: true },
  name: { type: String, required: true },
  username: { type: String, required: true },
  url: String,
  },
  { timestamps: true },
);

useVirtualId(tweetSchema);
const Tweet = Mongoose.model('Tweet', tweetSchema);

export async function getAll() {
  return Tweet.find().sort({ createdAt: -1 });
}

export async function getByUsername(username) {
  return Tweet.find({ username }).sort({ createdAt: -1 });
}

export async function findById(id) {
  return Tweet.findById(id);
}

export async function create(text, userId) {
  const { name, username, url } = await userRepository.findById(userId);
  const tweet = {
    text,
    userId,
    name,
    username,
    url,
  };
  return new Tweet(tweet).save();
}

export async function update(id, text) {
  return Tweet.findByIdAndUpdate(id, { text }, { returnOriginal: false });
}

export async function remove(id) {
  return Tweet.findByIdAndDelete(id);
}
