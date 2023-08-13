import * as userRepository from "../data/users.js";
import MongoDb from "mongodb";
import { getTweets } from '../database/database.js'

export async function getAll() {
  return getTweets().find().sort({ createdAt: -1 }).toArray().then(mapOptionalTweets);
}

export async function getByUsername(username) {
  return getTweets().find({ username }).toArray().then(mapOptionalTweets);
}

export async function findById(id) {
  return getTweets().findOne({ _id : new MongoDb.ObjectId(id) }).then(mapOptionalTweet);
}

export async function create(text, userId) {
  const { name, username, url } = await userRepository.findById(userId);
  const tweet = {
    text,
    createdAt: new Date(),
    userId,
    name,
    username,
    url,
  };
  const result = getTweets().insertOne(tweet)
                .then(data => mapOptionalTweet({ ...tweet, _id: data.insertedId }));
  return result;
}

export async function update(id, text) {
  return getTweets().findOneAndUpdate(
                    { _id : new MongoDb.ObjectId(id) },
                    { $set: { text } },
                    { returnDocument: 'after' }
                    )
                    .then(result => result.value)
                    .then(mapOptionalTweet);
}

export async function remove(id) {
  await getTweets().deleteOne({ _id : new MongoDb.ObjectId(id) })
}

const mapOptionalTweet = (tweet) => {
  return tweet ? {...tweet, id: tweet._id.toString() } : tweet;
}

const mapOptionalTweets = (tweets) => {
  return tweets.map(mapOptionalTweet);
}
