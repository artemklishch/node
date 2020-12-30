const { Router } = require("express");
const router = Router();
const Order = require("../models/order");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  const orders = await Order.find({ "user.userId": req.user._id }).populate(
    "user.userId"
  );
  try {
    res.render("orders", {
      title: "Заказы",
      isOrder: true,
      orders: orders.map((o) => ({
        ...o._doc,
        price: o.courses.reduce(
          (total, c) => (total += c.course.price * c.count),
          0
        ),
      })),
    });
  } catch (e) {
    console.log(e);
  }
});
router.post("/", auth, async (req, res) => {
  try {
    const user = await req.user.populate("cart.items.courseId").execPopulate();
    //   const user = await req.user // это тоже работает
    const courses = user.cart.items.map((i) => ({
      count: i.count,
      course: { ...i.courseId._doc }, // это не понятно зачем
    }));
    const order = new Order({
      user: {
        name: req.user.name,
        userId: req.user, // программа вместо нас достает _id
      },
      courses,
    });
    await order.save();
    await req.user.clearCart();
    res.redirect("/orders");
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
