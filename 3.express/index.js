const express = require("express");
const app = express();
const user = "ALi SHan";

// (request = route, response = requestHandler)

// session management
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const requestTime = (req, res, next) => {
  req.requestTime = Date.now();
  console.log("middleware ran");
  next();
};

app.use(requestTime);

app.get("/user", (req, res, next) => {
  return next(new Error("user not found bro"));
});

app.get("/", (req, res) => {
  res.send(
    `<h1>hello from the other side</h1> requested at ${req.requestTime}`,
  );
});

// error handling in app.use
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("SOMETHING WENT WRONG MY GUY");
});

app.listen(3000, () => {
  console.log("app is listening at port: ", 3000);
});
