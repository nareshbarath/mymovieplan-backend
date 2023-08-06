const express = require("express");
const router = express();
const {
  addGenre,
  listGenres,
  updateGenre
} = require("../controller/genreController");
const { verifyAuth } = require("../middlewares/verifyToken");

router.use(verifyAuth);

router.post("/addgenre", async (req, res) => {
  await addGenre(req, res);
});

router.get("/listgenres", async (req, res) => {
  await listGenres(req, res);
});

router.patch("/updategenre/:id", async (req, res) => {
  await updateGenre(req, res);
});

module.exports = router;
