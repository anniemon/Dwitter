let tweets = [
  {
    id: "1",
    text: "화이팅!",
    createdAt: Date.now().toString(),
    name: "Bob",
    username: "bob",
    url: "https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png",
  },
  {
    id: "2",
    text: "안뇽!",
    createdAt: Date.now().toString(),
    name: "Ellie",
    username: "ellie",
  },
  {
    id: "3",
    text: "커몬",
    createdAt: Date.now().toString(),
    name: "hey",
    username: "hello",
  },
  {
    id: "4",
    text: "good job",
    createdAt: Date.now().toString(),
    name: "sweet",
    username: "girl",
  },
  {
    id: "5",
    text: "good morning y'all",
    createdAt: Date.now().toString(),
    name: "some",
    username: "guy",
  },
];

export function read() {
  return tweets;
}

export function getByUsername(username) {
  return tweets.filter((tweet) => tweet.username === username);
}

export function findById(id) {
  const found = tweets.find((tweet) => tweet.id === id);
  return found;
}

export function create(text, name, username) {
  const tweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
    name,
    username,
  };
  tweets = [tweet, ...tweets];
  return tweet;
}

export function update(id, text) {
  const tweet = tweets.find((tweet) => tweet.id === id);
  if (tweet) {
    tweet.text = text;
  }
  return tweet;
}

export function remove(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);
}
