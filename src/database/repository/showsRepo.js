const { Op } = require("sequelize");
const DB = require("../databaseConnection");
const { Shows } = DB;

class showService {
  constructor() {}

  async addShow(showObj) {
    return await Shows.create(showObj);
  }

  async upComingShows() {
    return await Shows.findAll({
      where: {
        showDate: { [Op.gte]: new Date().setDate(new Date().getDate() - 1) }
      }
    });
  }

  async getShowsbyMovie(id) {
    return await Shows.findAll({
      where: {
        showDate: { [Op.gte]: new Date().setDate(new Date().getDate()) },
        isactive: true,
        movieId: id
      }
    });
  }

  async findbyId(id) {
    return await Shows.findByPk(id);
  }

  async checkAvaliablity(showDate, showTime) {
    return await Shows.findOne({
      where: {
        showDate,
        showTime
      }
    });
  }
}
module.exports = { showService };
