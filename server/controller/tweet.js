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
  const tweet = await TweetRepository.findById(id);
  if (!tweet) {
    return res.sendStatus(404);
  }
  if (tweet.userId !== req.userId) {
    return res.status(403).json({ message: `no permissions` });
  }
  const updated = await TweetRepository.update(id, text);
  return res.status(200).json(updated);
}

export async function deleteTweet(req, res) {
  const id = req.params.id;
  const tweet = await TweetRepository.findById(id);
  if (!tweet) {
    return res.sendStatus(404);
  }
  if (tweet.userId !== req.userId) {
    res.status(403).json({ message: `no permissions` });
  }
  await TweetRepository.remove(id);
  res.sendStatus(204);
}
