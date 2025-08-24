const {
  registerUser,
  loginUser,
  userCredits,
  paymentRazorpay,
} = require("../controller/userController");
const express = require("express");
const checkAuth = require("../middlewares/auth");

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/credits", checkAuth, userCredits);
// userRouter.get("/pay-razor", checkAuth, paymentRazorpay);

module.exports = userRouter;
