const { Op } = require("sequelize");
const DB = require("../databaseConnection");
const { Movies } = DB;

class movieService {
  constructor() {}

  async addMovie(movieObj) {
    return await Movies.create(movieObj);
  }

  async listMovies() {
    return await Movies.findAll();
  }

  async activeMovies() {
    return await Movies.findAll({ where: { isactive: true } });
  }

  async getMoviebyId(id) {
    return Movies.findByPk(id);
  }
}
module.exports = { movieService };
