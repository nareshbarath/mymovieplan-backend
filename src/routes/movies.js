const express = require("express");
const router = express();
const {
  addMovie,
  listMovies,
  updateMovie,
  movieStatusChange,
  activeMoviesList
} = require("../controller/movieController");
const { verifyAuth } = require("../middlewares/verifyToken");

router.use(verifyAuth);

router.post("/addmovie", async (req, res) => {
  await addMovie(req, res);
});

router.get("/listmovie", async (req, res) => {
  await listMovies(req, res);
});

router.patch("/updatemovie/:id", async (req, res) => {
  await updateMovie(req, res);
});

router.patch("/updatestatus/:id", async (req, res) => {
  await movieStatusChange(req, res);
});

router.get("/activemovies", async (req, res) => {
  await activeMoviesList(req, res);
});

module.exports = router;
