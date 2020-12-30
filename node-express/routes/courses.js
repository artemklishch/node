const { Router } = require("express");
const router = Router();
const Course = require("../models/course");
const auth = require("../middleware/auth");
// const mongooseToObj = require('../helpers/funcsForTransform')
// const multipleMongooseToObj = require('../helpers/funcsForTransform')

router.get("/", async (req, res) => {
  // const courses = await Course.find().map((c) => JSON.parse(JSON.stringify(c)));
  const courses = await Course.find()
    .populate("userId", "email name") // переходит по рефу, что в модели, и указан в свойстве через userId
    .select("price title img"); // вытаскивает конкретные данные из courses
  res.render("courses", {
    title: "Курсы",
    isCourses: true,
    courses,
  });
});

router.post("/edit", auth, async (req, res) => {
  const { id } = req.body;
  delete req.body.id;
  await Course.findByIdAndUpdate(id, req.body);
  res.redirect("/courses");
});

router.post("/remove", auth, async (req, res) => {
  try {
    await Course.deleteOne({ _id: req.body.id });
    res.redirect("/courses");
  } catch (e) {
    console.log(e);
  }
});

router.get("/:id/edit", auth, async (req, res) => {
  if (!req.query.allow) {
    return res.redirect("/");
  }
  const course = await Course.findById(req.params.id);
  res.render("course-edit", {
    title: `Редактировать курс ${course.title}`,
    course,
  });
});

router.get("/:id", async (req, res) => {
  const course = await Course.findById(req.params.id);
  res.render("course", {
    layout: "empty",
    title: `Курс ${course.title}`,
    course,
  });
});

module.exports = router;
