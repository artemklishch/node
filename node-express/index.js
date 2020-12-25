const express = require("express");
// const path = require("path");
const exphbs = require("express-handlebars");
const homeRoutes = require("./routes/home");
const coursesRoutes = require("./routes/courses");
const addRoutes = require("./routes/add");

const app = express();
const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs",
});
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.static("public"));
app.use("/", homeRoutes);
app.use("/courses", coursesRoutes);
app.use("/add", addRoutes);

// app.get("/", (req, res) => {
//   res.status(200); работает по умолчанию
//   res.sendFile(path.join(__dirname, "views", "index.html")); так делать, если не использовать handlebars
// res.render("index", {
//   title: "Главная страница",
//   isHome: true,
// });
// });

app.get("/about", (req, res) => {
  res.render("about", {
    title: "О нас",
  });
});

// app.get("/courses", (req, res) => {
//   res.render("courses", {
//     title: "Курсы",
//     isCourses: true,
//   });
// });
// app.get("/add", (req, res) => {
//   res.render("add", {
//     title: "Добавить курс",
//     isAdd: true,
//   });
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
