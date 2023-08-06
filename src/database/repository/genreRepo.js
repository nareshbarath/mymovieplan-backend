const { Op } = require("sequelize");
const DB = require("../databaseConnection");
const { Genres } = DB;

class genreServices {
  constructor() {}

  async checkDuplicate(genre) {
    return await Genres.findOne({ where: { genre } });
  }

  async createGenre(genre, description) {
    return await Genres.create({ genre, description });
  }

  async getGenres() {
    return await Genres.findAll();
  }

  async findGenrebyId(id) {
    return await Genres.findByPk(id);
  }
}

module.exports = { genreServices };
