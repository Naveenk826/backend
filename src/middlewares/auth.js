const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  // const token = req.headers.authorization?.split(" ")[1];
  const token = req.cookies.token;
  console.log(token, req.cookies);
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized, invalid token" });
  }
};

module.exports = { isAuthenticated };
