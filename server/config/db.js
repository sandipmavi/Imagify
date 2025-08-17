const mongoose = require("mongoose");
require("dotenv").config();

const connectDb = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}`);
  } catch (error) {
    console.log("Error Connecting database", error.message);
  }
};
module.exports = connectDb;
