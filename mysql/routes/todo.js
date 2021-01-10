const { Router } = require("express");
const router = Router();

// получение списка задач
router.get("/", (req, res) => {
  res.json({ a: 1 });
});

// создание новой задачи
router.post("/", (req, res) => {});

// изменение статуса задачи при клике на чекбокс
router.put("/:id", (req, res) => {});

// удаление задачи из списка
router.delete("/", (req, res) => {});

module.exports = router;
