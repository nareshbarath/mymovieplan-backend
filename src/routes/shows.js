const express = require("express");
const router = express();
const {
  addShow,
  upComingShows,
  updateShowStatus,
  getShowsbymovie
} = require("../controller/showController");
const { verifyAuth } = require("../middlewares/verifyToken");

router.use(verifyAuth);

router.post("/addshow", async (req, res) => {
  await addShow(req, res);
});

router.get("/upcoming", async (req, res) => {
  await upComingShows(req, res);
});

router.patch("/updatestatus/:id", async (req, res) => {
  await updateShowStatus(req, res);
});

router.get("/bymovie/:id", async (req, res) => {
  await getShowsbymovie(req, res);
});

module.exports = router;
