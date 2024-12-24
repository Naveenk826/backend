const express = require("express");
const router = express.Router();
const { getProducts } = require("../controllers/product.controller");
const { isAuthenticated } = require("../middlewares/auth");

router.get("/products", isAuthenticated, getProducts);

module.exports = router;
