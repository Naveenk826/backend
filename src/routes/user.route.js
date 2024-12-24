const express = require("express");
const router = express.Router();
const { loginUser, logoutUser } = require("../controllers/user.controller");

router.post("/login", loginUser);
router.post('/logout', logoutUser)

module.exports = router;
