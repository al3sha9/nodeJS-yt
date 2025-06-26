const express = require("express");
const app = express();
const usermodel = require("./models/usermodel");
const postmodel = require("./models/postsmodel");

app.get("/", (req, res) => {
  res.send("hwllo world");
});

app.get("/create", async (req, res) => {
  const createdUser = await usermodel.create({
    username: "Ali Shan",
    email: "ali@typs.dev",
    age: 25,
  });
  res.send(createdUser);
});

app.get("/post/create", async (req, res) => {
  const createdPost = await postmodel.create({
    postdata: "hello this is a post",
    user: "685db2c8526213841885f68b",
  });

  let user = await usermodel.findOne({ _id: "685db2c8526213841885f68b" });
  user.posts.push(createdPost._id);
  await user.save();
  res.send({ createdPost, user });
});

app.listen(3000, () => {
  console.log("server is listening at port: ", 3000);
});
