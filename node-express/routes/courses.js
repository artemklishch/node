const { Router } = require("express");
const router = Router();
const Course = require("../models/course");
const auth = require("../middleware/auth");
// const mongooseToObj = require('../helpers/funcsForTransform')
// const multipleMongooseToObj = require('../helpers/funcsForTransform')

function isOwner(course, req) {
  return course.userId.toString() === req.user._id.toString();
}

router.get("/", async (req, res) => {
  try {
    // const courses = await Course.find().map((c) => JSON.parse(JSON.stringify(c)));
    const courses = await Course.find()
      .populate("userId", "email name") // переходит по рефу, что в модели, и указан в свойстве через userId
      .select("price title img"); // вытаскивает конкретные данные из courses
    res.render("courses", {
      title: "Курсы",
      isCourses: true,
      courses,
      userId: req.user ? req.user._id.toString() : null,
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/edit", auth, async (req, res) => {
  try {
    const { id } = req.body;
    delete req.body.id;
    const course = await Course.findById(id);
    if (!isOwner(course, req)) {
      return res.redirect("/courses");
    }
    Object.assign(course, req.body);
    await course.save();
    // await Course.findByIdAndUpdate(id, req.body);
    res.redirect("/courses");
  } catch (err) {
    console.log(err);
  }
});

router.post("/remove", auth, async (req, res) => {
  try {
    await Course.deleteOne({ _id: req.body.id, userId: req.user._id });
    res.redirect("/courses");
  } catch (e) {
    console.log(e);
  }
});

router.get("/:id/edit", auth, async (req, res) => {
  if (!req.query.allow) {
    return res.redirect("/");
  }
  try {
    const course = await Course.findById(req.params.id);
    if (!isOwner(course, req)) {
      return res.redirect("/courses");
    }
    res.render("course-edit", {
      title: `Редактировать курс ${course.title}`,
      course,
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    res.render("course", {
      layout: "empty",
      title: `Курс ${course.title}`,
      course,
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
