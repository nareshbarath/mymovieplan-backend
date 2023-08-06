module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define("movies", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    movieName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    movieImage: {
      type: DataTypes.STRING,
      allowNull: false
    },
    movieDescription: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    movieGenre: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    isactive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });
  return Movie;
};
