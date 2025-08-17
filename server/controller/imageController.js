const axios = require("axios");
const FormData = require("form-data");
require("dotenv").config();
const userModel = require("../models/userModel");

const generateImage = async (req, res) => {
  try {
    const { prompt } = req.body;
    const userId = req.userId;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(401).json({ success: false, message: "UnAuthorized" });
    }
    if (!prompt) {
      return res
        .status(400)
        .json({ success: false, message: "Please Enter a valid prompt" });
    }
    if (user.creditBalance <= 0) {
      return res.status(400).json({
        success: false,
        message: "No Credit Balance",
        creditBalance: user.creditBalance,
      });
    }

    // ✅ Fix form-data
    const formData = new FormData();
    formData.append("prompt", prompt);

    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API,
          ...formData.getHeaders(), // ✅ Important for form-data headers
        },
        responseType: "arraybuffer",
      }
    );

    const base64Image = Buffer.from(data, "binary").toString("base64");
    const resultImage = `data:image/png;base64,${base64Image}`;

    // ✅ Decrement credits
    await userModel.findByIdAndUpdate(user._id, {
      creditBalance: user.creditBalance - 1,
    });

    res.status(200).json({
      success: true,
      message: "Image Generated",
      creditBalance: user.creditBalance - 1,
      resultImage,
    });
  } catch (error) {
    console.log("Generate Image Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = generateImage;
