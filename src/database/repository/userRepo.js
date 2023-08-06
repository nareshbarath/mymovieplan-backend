const { Op } = require("sequelize");
const DB = require("../databaseConnection");
const { Users } = DB;

class userServices {
  constructor() {}

  async findUserbyId(id) {
    return await Users.findByPk(id);
  }

  async checkDuplicate(email, phone) {
    return await Users.findOne({ where: { [Op.or]: [{ email }, { phone }] } });
  }

  async findUserbyEmail(email) {
    return await Users.findOne({ where: { email } });
  }

  async createUser(userObj) {
    return await Users.create(userObj);
  }
}

module.exports = { userServices };
