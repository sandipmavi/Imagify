const express = require("express");
const cors = require("cors");
const connectDb = require("./config/db");
const userRouter = require("./routes/userRoutes");
const imageRouter = require("./routes/imageRoute");
require("dotenv").config();

const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use("/api/user", userRouter);
app.use("/api/image", imageRouter);

app.get("/", (req, res) => {
  res.send("Api working fine, welcome to the Api of the imagify-app");
});
connectDb().then(() => {
  console.log("Database Connected");
});

app.listen(PORT, () => {
  console.log("Server is running on PORT: 4000");
});
module.exports = app;
