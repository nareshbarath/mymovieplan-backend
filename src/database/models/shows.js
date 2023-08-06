module.exports = (sequelize, DataTypes) => {
  const Show = sequelize.define("shows", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    movieId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    showDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    showTime: {
      type: DataTypes.TIME,
      allowNull: false
    },
    isactive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });
  return Show;
};
