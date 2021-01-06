const { body } = require("express-validator");
const User = require("../models/user");

exports.registerValidators = [
  body("email")
    .isEmail()
    .withMessage("Введите корректный email")
    .custom(async (value, { req }) => {
      try {
        const user = await User.findOne({ email: value });
        if (user) {
          return Promise.reject("Такой email уже занят");
        }
      } catch (err) {
        console.log(err);
      }
    })
    .normalizeEmail(),
  body(
    "password",
    "Пароль должен быть не меньше 6, не больше 56 символов и состоять только из цифр и букв"
  )
    .isLength({ min: 6, max: 56 })
    .isAlphanumeric()
    .trim(),
  body("confirm")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Пароли должны совпадать");
      }
      return true;
    })
    .trim(),
  body("name")
    .isLength({ min: 3 })
    .withMessage("Длина имени должна быть не меньше 3 символов")
    .trim(),
];

exports.logInValidators = [
  body("email")
    .isEmail()
    .withMessage("Введите корректный email")
    .custom(async (value, { req }) => {
      try {
        const user = await User.findOne({ email: value });
        if (!user) {
          return Promise.reject(
            "Пользователя с таким email не найдено. Зарегистрируйтесь или введите правильны email"
          );
        }
      } catch (err) {
        console.log(err);
      }
    })
    .normalizeEmail(),
];

exports.courseValidators = [
  body("title")
    .isLength({ min: 3 })
    .withMessage("Минимальная длина названия 3 символа")
    .trim(),
  body("price").isNumeric().withMessage("Введите корректную цену"),
  body("img", "Введите конкретный URL картинки").isURL(),
];
