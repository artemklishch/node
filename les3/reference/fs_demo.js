const fs = require("fs");
const path = require("path");

//Create a folder
// fs.mkdir(path.join(__dirname, "/test"), {}, (err) => {
//   if (err) throw err;
//   console.log("Folder created...");
// });

//Create and wtite to file
// fs.writeFile(path.join(__dirname, "/test", 'text.txt'), "Hello world!", (err) => {
//   if (err) throw err;
//   console.log("File written to...");
// });
// //File append
// fs.appendFile(path.join(__dirname, "/test", 'text.txt'), "I love NodeJS!", (err) => {
//   if (err) throw err;
//   console.log("File written to...");
// });

//Read file
// fs.readFile(path.join(__dirname, "/test", "text.txt"), "utf8", (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

//Rename file
fs.rename(
  path.join(__dirname, "/test", "text.txt"),
  path.join(__dirname, "/test", "helloworld.txt"),
  (err) => {
    if (err) throw err;
    console.log("File renamed...");
  }
);
