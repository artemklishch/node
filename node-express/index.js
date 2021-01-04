const express = require("express");
const path = require("path");
const Handlebars = require("handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongodb-session")(session);
const cserf = require("csurf");
const flash = require("connect-flash");

const varMiddleware = require("./middleware/variables");
const userMiddleware = require("./middleware/user");
const homeRoutes = require("./routes/home");
const cardRoutes = require("./routes/card");
const coursesRoutes = require("./routes/courses");
const addRoutes = require("./routes/add");
const ordersRoutes = require("./routes/orders");
const authRoutes = require("./routes/auth");
const keys = require("./keys");

// const User = require("./models/user");

const app = express();
const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs",
  handlebars: allowInsecurePrototypeAccess(Handlebars),
  helpers: require("./utils/hbs-helpers"),
});
const store = new MongoStore({
  collection: "sessions",
  uri: keys.MONGODB_URI,
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

// app.use(async (req, res, next) => {
//   try {
//     const user = await User.findById("5feb02a199817132a4a0843a");
//     req.user = user;
//     next();
//   } catch (e) {
//     console.log(e);
//   }
// });

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: keys.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store,
  })
);
app.use(cserf());
app.use(flash());
app.use(varMiddleware);
app.use(userMiddleware);

app.use("/", homeRoutes);
app.use("/courses", coursesRoutes);
app.use("/add", addRoutes);
app.use("/card", cardRoutes);
app.use("/orders", ordersRoutes);
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    const url =
      // "mongodb+srv://Artem:fG9cG4uNaHgEGky@cluster0.qnewn.mongodb.net/test?retryWrites=true&w=majority";
      // "mongodb+srv://Artem:fG9cG4uNaHgEGky@cluster0.qnewn.mongodb.net/shop";
      // await mongoose.connect(url, {
      await mongoose.connect(keys.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      });
    // mongoose.set('useFindAndModify', false);
    // const candidate = await User.findOne();
    // if (!candidate) {
    //   const user = new User({
    //     email: "test@gmail.com",
    //     name: "Artem",
    //     cart: { items: [] },
    //   });
    //   await user.save();
    // }
    app.listen(PORT, () => {
      console.log(`Server is running on PORT: ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}
start();
// const password = "fG9cG4uNaHgEGky";
