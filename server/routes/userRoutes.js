const {
  registerUser,
  loginUser,
  userCredits,
} = require("../controller/userController");
const express = require("express");
const checkAuth = require("../middlewares/auth");

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/credits", checkAuth, userCredits);

module.exports = userRouter;
