const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    return res
      .status(400)
      .json({ message: "Please Provide email and password to continue..!" });
  }

  const user = await User.findOne({ email });

  if (!user || password !== user.password) {
    return res.status(400).json({ message: "Email or password is incorrect" });
  }

  const token = generateToken(user._id);

  if (user && password === user.password) {
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 60 * 60 * 1000,
    });
    res.status(200).json({
      message: "User Succefully SignedIn",
      userLoggedIn: true,
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};

exports.logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "Strict",
  });
  res.status(200).json({ message: "Logged out successfully" });
};
