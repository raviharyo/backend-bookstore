'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Genre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Genre.hasMany(models.BookGenre,{
        foreignKey: 'CategoryId'
      })
    }
  }
  Genre.init({
    name: DataTypes.STRING,
    InputerId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Genre',

  });
  return Genre;
};