const fs = require("fs");
const path = require("path");
const p = path.join(path.dirname(require.main.filename), "data", "card.json");

class Card {
  static async add(course) {
    const card = await Card.fetch();
    const idx = card.courses.findIndex((c) => c.id === course.id);
    const candidate = card.courses[idx];
    if (candidate) {
      // курс уже есть в массиве
      candidate.count++;
      card.courses[idx] = candidate;
    } else {
      // в массиве курса нет
      course.count = 1;
      card.courses.push(course);
    }
    card.price += +course.price;
    return new Promise((resolve, reject) => {
      fs.writeFile(p, JSON.stringify(card), (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  }
  static async fetch() {
    return new Promise((resolve, reject) => {
      fs.readFile(p, "utf-8", (err, content) => {
        if (err) reject(err);
        resolve(JSON.parse(content));
      });
    });
  }
}
module.exports = Card;
