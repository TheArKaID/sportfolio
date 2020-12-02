'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class skills extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  skills.init({
    user_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    level: DataTypes.CHAR,
    description: DataTypes.TEXT
  }, {
    sequelize,
    timestamps: true,
    modelName: 'skills',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return skills;
};