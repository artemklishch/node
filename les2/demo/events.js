const EventEmitter = require("events");

// const emitter = new EventEmitter();
// emitter.on("anything", (data) => {
//   console.log("ON: Anything", data);
// });
// emitter.emit("anything", { a: 1 });
// emitter.emit("anything", { b: 2 });

// setTimeout(() => {
//   emitter.emit("anything", { c: 5 });
// }, 1500);

class Dispatcher extends EventEmitter {
  subscribe(eventName, cb) {
    console.log("[Subscribe]...");
    this.on(eventName, cb);
  }
  dispatch(eventName, data) {
    console.log("[Dispatching...]");
    this.emit(eventName, data);
  }
}
const dis = new Dispatcher();
dis.dispatch("aa", { ABC: 22 });
dis.subscribe("aa", (data) => {
  console.log("ON: event aa", data);
});
dis.dispatch("aa", { ABC: 22 });
