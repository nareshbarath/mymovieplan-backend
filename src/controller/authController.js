const { userServices } = require("../database/repository/userRepo");
const { verifyPassword } = require("../helpers/bcrypt");
const { generateJWT, verifyJWT } = require("../helpers/jwt");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const us = new userServices();

    if (!password || !email)
      return res
        .status(400)
        .json({ status: true, message: "Please fill the required fields" });

    const user = await us.findUserbyEmail(email);
    if (!user)
      return res.status(400).json({ status: true, message: "Incorrect email" });

    if (await verifyPassword(password, user.password)) {
      const token = generateJWT(user);
      res
        .status(200)
        .json({ status: true, message: "Login successful", token, user });
    } else {
      res.status(400).json({ status: true, message: "Incorrect password" });
    }
  } catch (err) {
    res.status(400).json({ status: false, message: err.message });
  }
};

module.exports = { login };
