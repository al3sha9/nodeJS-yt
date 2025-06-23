const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/auth-prac");

const userSchema = new mongoose.Schema({
  age: Number,
  email: String,
  username: String,
  password: String,
});

module.exports = mongoose.model("user", userSchema);
