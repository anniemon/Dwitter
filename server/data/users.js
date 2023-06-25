let users = [
  {
    id: "1",
    createdAt: new Date().toString(),
    name: "Bob",
    username: "bob",
    email: "kelly@gmail.com",
    password: "",
    url: "https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png",
  },
  {
    id: "2",
    createdAt: new Date().toString(),
    name: "Ellie",
    username: "ellie",
    email: "ellie@example.com",
    password: "$2b$10$h1mNHkpQGgilGQu0UYeoC.K2PSoNStFHFuPg7ZzrZ9rW2fZ9x78RC", //1234asdf
    url: "https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png",
  },
  {
    id: "3",
    createdAt: new Date().toString(),
    name: "hey",
    username: "hello",
    email: "hello@gmail.com",
    password: "$2b$10$h1mNHkpQGgilGQu0UYeoC.K2PSoNStFHFuPg7ZzrZ9rW2fZ9x78RC",
  },
];

export async function create(name, username, password, email, url = "") {
  const newUser = {
    id: new Date().toString(),
    createdAt: new Date(),
    name,
    username,
    password,
    email,
    url,
  };
  users = [...users, JSON.parse(JSON.stringify(newUser))];
  return newUser.id;
}

export async function get(username, requirePassword = false) {
  const user = users.find((user) => user.username === username);
  if (!user) return null;
  else {
    if (requirePassword) {
      return user;
    }
    const payload = JSON.parse(JSON.stringify(user));
    delete payload.password;
    return payload;
  }
}

export async function findById(id) {
  const user = users.find((user) => user.id === id);
  if (!user) return null;
  const payload = JSON.parse(JSON.stringify(user));
  delete payload.password;
  return payload;
}
