const express = require("express");
const Handlebars = require("handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");

const homeRoutes = require("./routes/home");
const cardRoutes = require("./routes/card");
const coursesRoutes = require("./routes/courses");
const addRoutes = require("./routes/add");
const User = require("./models/user");

const path = require("path");

const app = express();
const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs",
  handlebars: allowInsecurePrototypeAccess(Handlebars),
  // helpers: require('./utils/hbs-helpers')
});
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(async (req, res, next) => {
  try {
    const user = await User.findById("5feb02a199817132a4a0843a");
    req.user = user;
    next();
  } catch (e) {
    console.log(e);
  }
});

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use("/", homeRoutes);
app.use("/courses", coursesRoutes);
app.use("/add", addRoutes);
app.use("/card", cardRoutes);

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    const url =
      // "mongodb+srv://Artem:fG9cG4uNaHgEGky@cluster0.qnewn.mongodb.net/test?retryWrites=true&w=majority";
      "mongodb+srv://Artem:fG9cG4uNaHgEGky@cluster0.qnewn.mongodb.net/shop";
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    // mongoose.set('useFindAndModify', false);
    const candidate = await User.findOne();
    if (!candidate) {
      const user = new User({
        email: "test@gmail.com",
        name: "Artem",
        cart: { items: [] },
      });
      await user.save();
    }
    app.listen(PORT, () => {
      console.log(`Server is running on PORT: ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}
start();
// const password = "fG9cG4uNaHgEGky";
