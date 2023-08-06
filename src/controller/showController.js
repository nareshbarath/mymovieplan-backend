const { showService } = require("../database/repository/showsRepo");

const addShow = async (req, res) => {
  try {
    const ss = new showService();
    const { movieId, showDate, showTime } = req.body;
    if (!movieId || !showDate || !showTime)
      return res
        .status(400)
        .json({ status: false, message: "Please fill the required fields" });

    const checkAvaliablity = await ss.checkAvaliablity(showDate, showTime);
    if (checkAvaliablity)
      return res
        .status(400)
        .json({ status: false, message: "Show slot not avaliable" });

    await ss.addShow({ movieId, showDate, showTime });
    res.status(200).json({ status: true, message: "Show added successfully" });
  } catch (err) {
    res.status(400).json({ status: false, message: err.message });
  }
};

const upComingShows = async (req, res) => {
  try {
    const ss = new showService();
    const shows = await ss.upComingShows();
    res.status(200).json({ status: true, message: "Data found", data: shows });
  } catch (err) {
    res.status(400).json({ status: false, message: err.message });
  }
};

const updateShowStatus = async (req, res) => {
  try {
    const ss = new showService();
    const show = await ss.findbyId(req.params.id);
    if (!show)
      return res.status(400).json({ status: false, message: "Show not found" });

      show.isactive = !show.isactive;
    await show.save();
    res
      .status(200)
      .json({ status: true, message: "Show status updated successfully" });
  } catch (err) {
    res.status(400).json({ status: false, message: err.message });
  }
};

const getShowsbymovie = async (req, res) => {
  try {
    const ss = new showService();
    const shows = await ss.getShowsbyMovie(req.params.id);
    res.status(200).json({ status: true, message: "Data found", data: shows });
  } catch (err) {
    res.status(400).json({ status: false, message: err.message });
  }
};

module.exports = { addShow, upComingShows, updateShowStatus, getShowsbymovie };
