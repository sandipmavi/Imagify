const express = require("express");
const generateImage = require("../controller/imageController");
const checkAuth = require("../middlewares/auth");

const imageRouter = express.Router();

imageRouter.post("/generate-image", checkAuth, generateImage);



module.exports = imageRouter;
