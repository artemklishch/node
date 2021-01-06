const { Router } = require("express");
const router = Router();
require("dotenv").config(); // без этого не работает .env
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
// const { body, validationResult } = require("express-validator/check"); // устаревший способ, отменен
const { validationResult } = require("express-validator"); // здесь есть функции body (для проверки полей формы), query (для проверки квери параметров), check (для проверки всего)
const nodemailer = require("nodemailer");
const sendgrid = require("nodemailer-sendgrid-transport");
const keys = require("../keys");
const regEmail = require("../emails/registration");
const resetEmail = require("../emails/reset");
const { registerValidators, logInValidators } = require("../utils/validators");
const User = require("../models/user");

// const transporter = nodemailer.createTransport(
//   sendgrid({
//     auth: { api_key: keys.SENDGRID_API_KEY },
//   })
// );
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // работает и без этого
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

router.get("/login", async (req, res) => {
  res.render("auth/login", {
    title: "Авторизация",
    isLogin: true,
    registerError: req.flash("registerError"),
    loginError: req.flash("loginError"),
  });
});
router.get("/logout", async (req, res) => {
  // req.session.isAuthenticated = false;
  // res.redirect("/auth/login#login");
  req.session.destroy(() => {
    res.redirect("/auth/login#login");
  });
});
router.post("/login", logInValidators, async (req, res) => {
  try {
    const errors = await validationResult(req); // здесь await мсы ставим, чтоб всегда отображать ошибку, т.к. если не ставить,то сообщение не будет успевать записываться
    if (!errors.isEmpty()) {
      await req.flash("loginError", errors.array()[0].msg); // возвращает массив с объектами ошибок, а из свойства msg достаем сообщение
      return res.status(422).redirect("/auth/login#login");
    }
    const { email, password } = req.body;
    const candidate = await User.findOne({ email });
    // if (candidate) {
      const areSame = await bcrypt.compare(password, candidate.password);
      if (areSame) {
        req.session.user = candidate;
        req.session.isAuthenticated = true;
        req.session.save((err) => {
          if (err) throw err;
          res.redirect("/");
        });
      } else {
        req.flash("loginError", "Такого пароля нет");
        req.session.save((err) => {
          if (err) throw err;
          res.redirect("/auth/login#login");
        });
      }
    // } else {
    //   req.flash("loginError", "Такого пользователя не существует");
    //   req.session.save((err) => {
    //     if (err) throw err;
    //     res.redirect("/auth/login#login");
    //   });
    // }
  } catch (e) {
    console.log(e);
  }
});
router.post("/register", registerValidators, async (req, res) => {
  try {
    const { email, password, confirm, name } = req.body; // confirm здесь не нужно 
    // const candidate = await User.findOne({ email });
    const errors = await validationResult(req); // здесь await мсы ставим, чтоб всегда отображать ошибку, т.к. если не ставить,то сообщение не будет успевать записываться
    if (!errors.isEmpty()) {
      req.flash("registerError", errors.array()[0].msg); // возвращает массив с объектами ошибок, а из свойства msg достаем сообщение
      return res.status(422).redirect("/auth/login#register");
    }
    // if (candidate) {
    //   req.flash("registerError", "Пользователь с таким email уже существует");
    //   req.session.save((err) => {
    //     if (err) throw err;
    //     res.redirect("/auth/login#register");
    //   });
    // } else {
      const hashPassword = await bcrypt.hash(password, 10);
      const user = new User({
        email,
        name,
        password: hashPassword,
        cart: { items: [] },
      });
      await user.save();
      res.redirect("/auth/login#login");
      await transporter.sendMail(regEmail(email));
    // }
  } catch (e) {
    console.log(e);
  }
});

router.get("/reset", (req, res) => {
  res.render("auth/reset", {
    title: "Забыли пароль?",
    error: req.flash("error"),
  });
});
router.get("/password/:token", async (req, res) => {
  if (!req.params.token) {
    return res.redirect("/auth/login");
  }
  try {
    const user = await User.findOne({
      resetToken: req.params.token,
      resetTokenExp: { $gt: Date.now() }, // проверяет, чтоб найденная дата была больше, чем дата в момент выполнения функции
    });
    if (!user) {
      return res.redirect("/auth/login");
    } else {
      res.render("auth/password", {
        title: "Восстановить доступ",
        error: req.flash("error"),
        userId: user._id.toString(),
        token: req.params.token,
      });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/reset", (req, res) => {
  try {
    crypto.randomBytes(32, async (err, buffer) => {
      if (err) {
        req.flash("error", "Что-то пошло не так, повтроите попытку позже");
        return res.redirect("/auth/reset");
      }
      const token = buffer.toString("hex");
      const candidate = await User.findOne({ email: req.body.email });
      if (candidate) {
        candidate.resetToken = token;
        candidate.resetTokenExp = Date.now() + 60 * 60 * 1000;
        await candidate.save();
        await transporter.sendMail(resetEmail(candidate.email, token));
        res.redirect("/auth/login");
      } else {
        req.flash("error", "Такого email нет");
        res.redirect("/auth/reset");
      }
    });
  } catch (err) {
    console.log(err);
  }
});
router.post("/password", async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.body.userId, // без трансформации? ведь _id это объект, а не строка
      resetToken: req.body.token,
      resetTokenExp: { $gt: Date.now() },
    });
    if (user) {
      user.password = await bcrypt.hash(req.body.password, 10);
      user.resetToken = undefined;
      user.resetTokenExp = undefined;
      await user.save();
      res.redirect("/auth/login");
    } else {
      res.flash("loginError", "Время жизни токена истекло");
      res.redirect("/auth/login");
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
