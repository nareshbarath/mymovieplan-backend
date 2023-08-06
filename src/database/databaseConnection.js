const dbconfig = require("../config/databaseconfig");
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(dbconfig.DB, dbconfig.USER, dbconfig.PASSWORD, {
  host: dbconfig.HOST,
  dialect: dbconfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbconfig.pool.max,
    min: dbconfig.pool.min,
    acquire: dbconfig.pool.acquire,
    idle: dbconfig.pool.idle
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => console.log(err));

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Users = require("./models/users")(sequelize, DataTypes);
db.Genres = require("./models/genres")(sequelize, DataTypes);
db.Movies = require("./models/movies")(sequelize, DataTypes);
db.Shows = require("./models/shows")(sequelize, DataTypes);

db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Sync is completed");
  })
  .catch((err) => console.log(err));

module.exports = db;
