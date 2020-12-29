const { Router } = require("express");
const router = Router();
const Course = require("../models/course");

function mapCartItems(cart) {
  return cart.items.map((c) => ({
    ...c.courseId._doc,
    id: c.courseId.id,
    count: c.count,
  }));
}
function computePrice(courses) {
  return courses.reduce((acc, item) => (acc += item.price * item.count), 0);
}

router.post("/add", async (req, res) => {
  const course = await Course.findById(req.body.id);
  await req.user.addToCart(course);
  res.redirect("/card");
});
router.get("/", async (req, res) => {
  // const user = await req.user.populate("cart.items.courseId")
  const user = await req.user.populate("cart.items.courseId").execPopulate(); // чтоб все работало
  const courses = mapCartItems(user.cart);
  res.render("card", {
    title: "Корзина",
    isCard: true,
    courses,
    price: computePrice(courses),
  });
});
router.delete("/remove/:id", async (req, res) => {
  await req.user.removeFromCart(req.params.id);
  const user = await req.user.populate("cart.items.courseId").execPopulate();
  const courses = mapCartItems(user.cart);
  console.log(courses);
  const cart = {
    courses,
    price: computePrice(courses),
  };
  res.status(200).json(cart);
});

module.exports = router;
