const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const path = require("path");
const userModel = require("./models/user");
const jwt = require("jsonwebtoken");

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/create", (req, res) => {
  let { username, email, password, age } = req.body;
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      let createdUser = await userModel.create({
        username,
        email,
        password: hash,
        age,
      });

      let token = jwt.sign({ email }, "mySecretKey");
      res.cookie("token", token);
      res.send(createdUser);
    });
  });
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  let user = await userModel.findOne({ email: req.body.email });
  if (!user) return res.send("something went wrong");

  bcrypt.compare(req.body.password, user.password, (err, result) => {
    if (result) {
      let token = jwt.sign({ email: user.email }, "mySecretKey");
      res.cookie("token", token);
      res.send("yes you can login");
    } else {
      res.send("Cant login pass");
    }
  });
});

app.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.send("Logged out");
});

app.get("/view", async (req, res) => {
  let allUsers = await userModel.find();
  res.send(allUsers);
});

app.listen(3000, () => {
  console.log("server is listening at port:", 3000);
});
