const jwt = require("jsonwebtoken");
const checkAuth = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    res
      .status(401)
      .json({ success: false, message: "UnAuthorized, Login Again" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.id) {
      res.status(401).json({ success: false, message: "UnAuthorized" });
    }
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error("Auth Error:", error.message);
    return res
      .status(401)
      .json({ success: false, message: "Invalid or Expired Token" });
  }
};
module.exports = checkAuth;
