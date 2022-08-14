import * as TweetRepository from "../data/tweets.js";

export async function getTweets(req, res) {
  const username = req.query.username;
  const data = await (username
    ? TweetRepository.getByUsername(username)
    : TweetRepository.getAll());
  res.status(200).json(data);
}

export async function getTweetsById(req, res) {
  const id = req.params.id;
  const tweet = await TweetRepository.findById(id);
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
}

export async function postTweet(req, res) {
  const { text } = req.body;
  const userId = req.userId;
  const tweet = await TweetRepository.create(text, userId);
  res.status(201).json(tweet);
}

export async function updateTweet(req, res) {
  const id = req.params.id;
  const text = req.body.text;
  const tweet = await TweetRepository.update(id, text);
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
}

export async function deleteTweet(req, res) {
  const id = req.params.id;
  await TweetRepository.remove(id);
  res.sendStatus(204);
}
