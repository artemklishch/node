const { Router } = require("express");
const Todo = require("../models/todo");
const router = Router();

// получение списка задач
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.status(200).json(todos);
  } catch (err) {
    console.log(err);
    res.status(500).json("Server error");
  }
});

// создание новой задачи
router.post("/", async (req, res) => {
  try {
    // Todo.build().save()
    const todo = await Todo.create({
      title: req.body.title,
      done: false,
    });
    res.status(201).json({ todo });
  } catch (err) {
    console.log(err);
    res.status(500).json("Server error");
  }
});

// изменение статуса задачи при клике на чекбокс
router.put("/:id", async (req, res) => {
  try {
    const todo = await Todo.findByPk(+req.params.id);
    todo.done = req.body.done;
    await todo.save();
    res.status(200).json({ todo });
  } catch (err) {
    console.log(err);
    res.status(500).json("Server error");
  }
});

// удаление задачи из списка
router.delete("/:id", async (req, res) => {
  try {
    const todos = await Todo.findAll({
      where: {
        id: +req.params.id,
      },
    });
    const todo = todos[0];
    await todo.destroy();
    res.status(204).json({});
  } catch (err) {
    console.log(err);
    res.status(500).json("Server error");
  }
});

module.exports = router;
