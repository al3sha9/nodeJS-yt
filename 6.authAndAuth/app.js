const express = require("express");
const app = express();
// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

app.use(cookieParser());

app.get("/", (req, res) => {
  // bcrypt.genSalt(10, (err, salt) => {
  //   // salt is a random string used to hash  the password and 10 is the total rounds of hashing
  //   bcrypt.hash("ali shan ka password", salt, (err, hash) => {
  //     // store password in db
  //     console.log(hash);
  //     // ali shan ka password
  //     //$2b$10$T1F4XjgcnCE/LGyuYScEW.xYREDaei8aMS0hxTs4tIwI5wSlRCTAm
  //   });
  // });
  //

  // bcrypt.compare(
  //   "ali shan ka password",
  //   "$2b$10$T1F4XjgcnCE/LGyuYScEW.xYREDaei8aMS0hxTs4tIwI5wSlRCTAm",
  //   (err, result) => {
  //     console.log(result); //true
  //   },
  // );

  let token = jwt.sign({ email: "ali@typs.dev" }, "myAmazingSecretKey");
  res.cookie("token", token);
  res.send("done");
});

app.get("/read", (req, res) => {
  // to verify the token
  jwt.verify(req.cookies.token, "myAmazingSecretKey", (err, decoded) => {
    if (err) {
      res.status(401).send("Unauthorized");
    } else {
      res.send("Welcome, " + decoded.email);
    }
  });
});

app.listen(3000, () => {
  console.log("server is listening at port:", 3000);
});
