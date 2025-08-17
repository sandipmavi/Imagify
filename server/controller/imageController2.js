const axios = require("axios");
const userModel = require("../models/userModel");

const generateImage = async (req, res) => {
  try {
    const { prompt } = req.body;
    const userId = req.userId;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid prompt",
      });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if (user.creditBalance <= 0) {
      return res.status(400).json({
        success: false,
        message: "No credit balance",
        creditBalance: user.creditBalance,
      });
    }

    // Call the image generation API
    const response = await axios.post(
      "https://api.deepai.org/api/text2img",
      { text: prompt },
      { headers: { "api-key": process.env.DEEPAI_API_KEY } }
    );

    const imageUrl = response.data.output_url;

    // Deduct credit and save
    user.creditBalance -= 1;
    await user.save();

    res.status(200).json({
      success: true,
      imageUrl,
      creditBalance: user.creditBalance,
    });
  } catch (error) {
    console.error("Error generating image:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = { generateImage };
