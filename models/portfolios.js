'use strict';
const uuid = require('uuid');
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
    id: DataTypes.UUID,
    user_id: DataTypes.UUID,
    project: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'portfolios',
  });
  
  portfolios.addHook('beforeSave', async (portfolio) => {
    return portfolio.id = uuid();
  });

  return portfolios;
};