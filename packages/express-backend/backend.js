import cors from "cors";
import express from "express";

const app = express();
const port = 8000;

const generateId = () => {
  const letters = Array.from({ length: 3 }, () =>
    String.fromCharCode(97 + Math.floor(Math.random() * 26))
  ).join("");

  const numbers = Math.floor(Math.random() * 900) + 100;

  return `${letters}${numbers}`;
};

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

const users = {
  users_list: [
    { id: "xyz789", name: "Charlie", job: "Janitor" },
    { id: "abc123", name: "Mac", job: "Bouncer" },
    { id: "ppp222", name: "Mac", job: "Professor" },
    { id: "yat999", name: "Dee", job: "Aspiring actress" },
    { id: "zap555", name: "Dennis", job: "Bartender" }
  ]
};

const addUser = (user) => {
  const newUser = { ...user, id: generateId() };
  users.users_list.push(newUser);
  return newUser;
};

app.post("/users", (req, res) => {
  const userToAdd = req.body;

  if (!userToAdd.name || !userToAdd.job) {
    return res.status(400).send("Name and job are required.");
  }

  const addedUser = addUser(userToAdd);

  res.status(201).send(addedUser);
});

app.get("/users", (req, res) => {
  const { name, job } = req.query;

  let result = users.users_list;

  if (name && job) {
    result = result.filter((user) => user.name === name && user.job === job);
  } else if (name) {
    result = result.filter((user) => user.name === name);
  }

  res.send({ users_list: result });
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  const user = users.users_list.find((user) => user.id === id);

  if (!user) {
    return res.status(404).send("User not found.");
  }

  res.send(user);
});

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  const index = users.users_list.findIndex((user) => user.id === id);

  if (index === -1) {
    return res.status(404).send("User not found.");
  }

  users.users_list.splice(index, 1);
  res.status(204).send();
});
