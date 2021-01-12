const Todo = require("../models/todo");

const users = [
  { name: "Bob", age: 30, email: "test1@gmail.com" },
  { name: "Tom", age: 23, email: "test2@gmail.com" },
];

// module.exports = {
//   test() {
//     return "Hello Graphql";
//   },
// };

module.exports = {
  test() {
    return {
      count: Math.trunc(Math.random() * 10),
      users,
    };
  },
  random({ min, max, count }) {
    // функция принимает некий объект, который содержит те данные, что деструктурируем
    const arr = [];
    for (let i = 0; i < count; i++) {
      const random = Math.random() * (max - min) + min;
      arr.push(random);
    }
    return arr;
  },
  //   addTestUser({ user }) {
  addTestUser({ user: { name, email } }) {
    const user = {
      name,
      email,
      age: Math.ceil(Math.random() * 30),
    };
    users.push(user);
    return user;
  },
  async getTodos() {
    try {
      return await Todo.findAll();
    } catch (e) {
      throw new Error("Fetch todos is not available");
    }
  },
  async createTodo({ todo }) {
    try {
      return await Todo.create({
        title: todo.title,
        done: false,
      });
    } catch (err) {
      throw new Error("Title id required");
    }
  },
  async completeTodo({ id }) {
    try {
      const todo = await Todo.findByPk(id);
      todo.done = true;
      await todo.save();
      return todo;
    } catch (err) {
      throw new Error("Failed to change task status");
    }
  },
  async deleteTodo({ id }) {
    try {
      const todos = await Todo.findAll({ where: { id } });
      const todo = todos[0];
      await todo.destroy();
      return true;
    } catch (e) {
      throw new Error("Failed to delete the task");
    }
  },
};
