const mongoose = require("mongoose");
const transactionSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    creditBalance: {
      type: Number,
      default: 5,
    },
  },
  { timestamps: true }
);
const transactionModel =
  mongoose.models.transaction ||
  mongoose.model("transaction", transactionSchema);
module.exports = userModel;
