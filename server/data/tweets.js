import * as userRepository from "../data/users.js";

let tweets = [
  {
    id: "1",
    text: "화이팅!",
    createdAt: new Date().toString(),
    userId: "1",
  },
  {
    id: "2",
    text: "안뇽!",
    createdAt: new Date().toString(),
    userId: "2",
  },
  {
    id: "3",
    text: "커몬",
    createdAt: new Date().toString(),
    userId: "3",
  },
  {
    id: "4",
    text: "good job",
    createdAt: new Date().toString(),
    userId: "1",
  },
  {
    id: "5",
    text: "good morning y'all",
    createdAt: new Date().toString(),
    userId: "2",
  },
];

export async function getAll() {
  return Promise.all(
    tweets.map(async (tweet) => {
      const { username, name, url } = await userRepository.findById(
        tweet.userId
      );
      return { ...tweet, username, name, url };
    })
  );
}

export async function getByUsername(username) {
  return getAll().then((tweets) =>
    tweets.filter((tweet) => tweet.username === username)
  );
}

export async function findById(id) {
  const found = tweets.find((tweet) => tweet.id === id);
  if (!found) {
    return null;
  }
  const { username, name, url } = await userRepository.findById(found.userId);
  return { ...found, username, name, url };
}

export async function create(text, userId) {
  const tweet = {
    id: new Date().toString(),
    text,
    createdAt: new Date(),
    userId,
  };
  tweets = [tweet, ...tweets];
  return findById(tweet.id);
}

export async function update(id, text) {
  const tweet = tweets.find((tweet) => tweet.id === id);
  if (tweet) {
    tweet.text = text;
  }
  return findById(tweet.id);
}

export async function remove(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);
}
