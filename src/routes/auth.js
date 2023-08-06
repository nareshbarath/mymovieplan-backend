const express = require("express");
const router = express();
const { login } = require("../controller/authController");

router.post("/login", (req, res) => {
  login(req, res);
});

module.exports = router;
