let users = [
  {
    id: "1",
    createdAt: Date.now().toString(),
    name: "Bob",
    username: "kelly",
    email: "kelly@gmail.com",
    password: "",
    url: "https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png",
  },
  {
    id: "2",
    createdAt: Date.now().toString(),
    name: "Ellie",
    username: "ellie",
    email: "ellie@example.com",
    password: "",
    url: "https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png",
  },
  {
    id: "3",
    createdAt: Date.now().toString(),
    name: "hey",
    username: "hello",
    email: "hello@gmail.com",
    password: "",
  },
];

export async function create(name, username, password, email, url = "") {
  const newUser = {
    id: Date.now().toString(),
    createdAt: new Date(),
    name,
    username,
    password,
    email,
    url,
  };
  users = [...users, JSON.parse(JSON.stringify(newUser))];
  delete newUser.password;
  return newUser;
}

export async function get(username) {
  const user = users.find((user) => user.username === username);
  const payload = JSON.parse(JSON.stringify(user));
  delete payload.password;
  return payload;
}

export async function getHash(username) {
  const user = users.find((user) => user.username === username);
  return user.password;
}
