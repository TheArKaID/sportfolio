'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class portfolios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  portfolios.init({
    user_id: DataTypes.INTEGER,
    project: DataTypes.STRING,
    platform: DataTypes.CHAR,
    description: DataTypes.TEXT
  }, {
    sequelize,
    timestamps: true,
    modelName: 'portfolios',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return portfolios;
};