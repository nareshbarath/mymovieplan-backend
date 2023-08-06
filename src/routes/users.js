const express = require("express");
const router = express();
const { addUser, updateUser } = require("../controller/userController");
const { verifyAuth } = require("../middlewares/verifyToken");

router.get("/", verifyAuth, (req, res) => {
  res.status(200).json({ status: true, message: "User router works" });
});

router.post("/adduser", async (req, res) => {
  await addUser(req, res);
});
router.use(verifyAuth);

router.post("/updateuser", async (req, res) => {
  await updateUser(req, res);
});

module.exports = router;
