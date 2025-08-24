const userModel = require("../models/userModel");
const transactionModel = require("../models/transactionModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const razorpay = require("razorpay");
require("dotenv").config();

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Missing details" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({ name, email, password: hashedPassword });
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Error creating account:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not registered" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Error in login:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const userCredits = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await userModel.findById(userId);
    res.status(200).json({
      success: true,
      credits: user.creditBalance,
      user: { name: user.name },
    });
  } catch (error) {
    console.log("Error in userCredits:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
// const razorpayInstance = new razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });
// const paymentRazorpay = async (req, res) => {
//   try {
//     const { planId } = req.body;
//     const userId = req.userId;
//     if (!userId || !planId) {
//       return res
//         .status(401)
//         .json({ success: false, message: "Missing Details" });
//     }
//     const userData = await userModel.findById(userId);
//     let credits, plan, amount, date;
//     switch (planId) {
//       case "Basic":
//         plan = "Basic";
//         credits = 100;
//         amount = 10;
//         break;
//       case "Advanced":
//         plan = "Advanced";
//         credits = 500;
//         amount = 50;
//         break;
//       case "Bussiness":
//         plan = "Bussiness";
//         credits = 5000;
//         amount = 250;
//         break;
//       default:
//         return res
//           .status(404)
//           .json({ success: false, message: "Plan not found" });
//     }
//     date = Date.now();

//     const transactionData = {
//       userId,
//       plan,
//       amount,
//       credits,
//       date,
//     };
//     const newTransaction = await transactionModel.create(transactionData);
//     const options = {
//       amount: amount * 100,
//       currency: process.env.CURRENCY,
//       receipt: newTransaction._id,
//     };
//     await razorpayInstance.orders.create(options, (error, order) => {
//       if (error) {
//         console.log(error);
//         return res.json(500).json({ success: false, message: error });
//       }
//       res.status(200).json({ success: true, order });
//     });
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

module.exports = { registerUser, loginUser, userCredits };
