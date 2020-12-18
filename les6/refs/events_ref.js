const EventEmitter = require("events");

class Logger extends EventEmitter {
  lis(message) {
    this.on(message, (data) => {
      console.log(data);
    });
  }
  log(message) {
    this.emit("message", `${message} ${Date.now()}`);
  }
  log2(message) {
    this.emit("hihi", `${message} and ${Date.now()}`);
  }
}

const logger = new Logger();
logger.on("message", (data) => {
  console.log(data);
});
logger.log("Hello our node");

const logger2 = new Logger();
logger2.lis("hihi");
logger2.log2("Hello my friend");
