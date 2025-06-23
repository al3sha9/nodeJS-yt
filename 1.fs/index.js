const fs = require("fs");
// let dataForFile = "lorem ipsum dolor sit amet";

// to write in file
// fs.writeFile("hello.txt", "hello world", (err) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log("data inserted");
// });

// to change stuff in file
// fs.appendFile("hello.txt", "\nchanged data", (err) => {
//   console.log("data changed");
// });

// to change file name
// fs.rename("hello.txt", "bye.txt", (err) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log("file renamed");
// });

// to copy file
// fs.copyFile("bye.txt", "./copy/hello.txt", (err) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log("copy donw");
// });

// to delete file
// fs.unlink("./copy/hello.txt", (err) => {
//   console.log(err.message);
//   console.log("file deleted");
// });

// to read file
fs.readFile("bye.txt", "utf-8", (err, data) => {
  console.log("read", data);
});
