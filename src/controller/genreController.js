const { genreServices } = require("../database/repository/genreRepo");

const addGenre = async (req, res) => {
  try {
    const gs = new genreServices();
    const { genre, description } = req.body;
    if (!genre || !description)
      return res
        .status(400)
        .json({ status: false, message: "Please fill the required fields" });

    const checkDuplicate = await gs.checkDuplicate(genre);
    if (checkDuplicate)
      return res
        .status(400)
        .json({ status: false, message: "Genre already exist" });

    await gs.createGenre(genre, description);
    res
      .status(200)
      .json({ status: true, message: "Genre created successfully" });
  } catch (err) {
    res.status(400).json({ status: false, message: err.message });
  }
};

const listGenres = async (req, res) => {
  try {
    const gs = new genreServices();
    const genres = await gs.getGenres();
    res.status(200).json({ status: true, message: "Data found", data: genres });
  } catch (err) {
    res.status(400).json({ status: false, message: err.message });
  }
};

const updateGenre = async (req, res) => {
  try {
    const { genre, description } = req.body;
    const gs = new genreServices();

    const Genre = await gs.findGenrebyId(req.params.id);
    if (!genre)
      return res
        .status(400)
        .json({ status: false, message: "Genre not found" });

    const checkDuplicate = await gs.checkDuplicate(genre);
    if (checkDuplicate && checkDuplicate.id != req.params.id)
      return res
        .status(400)
        .json({ status: false, message: "Genre name already exist" });

    Genre.genre = genre;
    Genre.description = description;
    await Genre.save();

    res
      .status(200)
      .json({ status: true, message: "Genre updated successfully" });
  } catch (err) {
    res.status(400).json({ status: false, message: err.message });
  }
};

module.exports = { addGenre, listGenres, updateGenre };
