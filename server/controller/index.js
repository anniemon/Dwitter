import { readTweets, setTweets } from "../data/tweets.js";

export function getTweets(req, res, next) {
  const username = req.query.username;
  const data = username
    ? readTweets().filter((tweet) => tweet.username === username)
    : readTweets();
  res.status(200).json(data);
}
export function getTweetsById(req, res, next) {
  const id = req.params.id;
  const tweet = readTweets().find((tweet) => tweet.id === id);
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
}
export function postTweet(req, res, next) {
  const { text, name, username } = req.body;
  const tweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
    name,
    username,
  };
  setTweets([tweet, ...readTweets()]);
  res.status(201).json(tweet);
}
export function updateTweet(req, res, next) {
  const id = req.params.id;
  const text = req.body.text;
  const tweet = readTweets().find((tweet) => tweet.id === id);
  if (tweet) {
    tweet.text = text;
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
}

export function deleteTweet(req, res, next) {
  const id = req.params.id;
  const rest = readTweets().filter((tweet) => tweet.id !== id);
  setTweets(rest);
  res.sendStatus(204);
}
