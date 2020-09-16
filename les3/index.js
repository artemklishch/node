// const Person = require("./person");
// const person1 = new Person("John Doe", 30);
// person1.greeting();

// const Logger = require("./logger");
// const logger = new Logger();
// logger.on("message", (data) => console.log("Called Listener:", data));
// logger.log("Hello world!");

const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer((req, res) => {
  console.log(req.url);
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, `Server is runnnig on port ${PORT}`);
