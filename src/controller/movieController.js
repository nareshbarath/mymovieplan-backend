const { movieService } = require("../database/repository/movieRepo");

const addMovie = async (req, res) => {
  try {
    const ms = new movieService();
    const { movieName, movieImage, movieDescription, movieGenre, price } =
      req.body;
    if (!movieName || !movieImage || !movieDescription || !movieGenre || !price)
      return res
        .status(400)
        .json({ status: false, message: "Please fill the required fields" });

    await ms.addMovie({
      movieName,
      movieImage,
      movieDescription,
      movieGenre,
      price
    });
    res.status(200).json({ status: true, message: "Movie added successfully" });
  } catch (err) {
    res.status(400).json({ status: false, message: err.message });
  }
};

const listMovies = async (req, res) => {
  try {
    const ms = new movieService();
    const movies = await ms.listMovies();
    res.status(200).json({ status: true, message: "Data found", data: movies });
  } catch (err) {
    res.status(400).json({ status: false, message: err.message });
  }
};

const updateMovie = async (req, res) => {
  try {
    const ms = new movieService();
    const { movieName, movieImage, movieDescription, movieGenre, price } =
      req.body;
    if (!movieName || !movieImage || !movieDescription || !movieGenre || !price)
      return res
        .status(400)
        .json({ status: false, message: "Please fill the required fields" });

    const movie = await ms.getMoviebyId(req.params.id);
    movie.movieName = movieName;
    movie.movieImage = movieImage;
    movie.movieDescription = movieDescription;
    movie.movieGenremovieGenre = movieGenre;
    movie.price = price;
    await movie.save();
    res
      .status(200)
      .json({ status: true, message: "Movie updated successfully" });
  } catch (err) {
    res.status(400).json({ status: false, message: err.message });
  }
};

const movieStatusChange = async (req, res) => {
  try {
    const ms = new movieService();
    const movie = await ms.getMoviebyId(req.params.id);
    movie.isactive = !movie.isactive;
    await movie.save();

    res
      .status(200)
      .json({ status: true, message: "Movie status updated successfully" });
  } catch (err) {
    res.status(400).json({ status: false, message: err.message });
  }
};

const activeMoviesList = async (req, res) => {
  try {
    const ms = new movieService();
    const movies = await ms.activeMovies();
    res.status(200).json({ status: true, message: "Data found", data: movies });
  } catch (err) {
    res.status(400).json({ status: false, message: err.message });
  }
};

module.exports = {
  addMovie,
  listMovies,
  updateMovie,
  movieStatusChange,
  activeMoviesList
};
