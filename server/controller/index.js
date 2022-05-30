import * as TweetRepository from "../data/tweets.js";

export function getTweets(req, res) {
  const username = req.query.username;
  const data = username
    ? TweetRepository.getByUsername(username)
    : TweetRepository.read();
  res.status(200).json(data);
}

export function getTweetsById(req, res) {
  const id = req.params.id;
  const tweet = TweetRepository.findById(id);
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
}

export function postTweet(req, res) {
  const { text, name, username } = req.body;
  const tweet = TweetRepository.create(text, name, username);
  res.status(201).json(tweet);
}

export function updateTweet(req, res) {
  const id = req.params.id;
  const text = req.body.text;
  const tweet = TweetRepository.update(id, text);
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
}

export function deleteTweet(req, res) {
  const id = req.params.id;
  TweetRepository.remove(id);
  res.sendStatus(204);
}
