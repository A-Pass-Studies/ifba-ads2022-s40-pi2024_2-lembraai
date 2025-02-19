'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Bairros extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Bairros.init({
    cidade_id: DataTypes.INTEGER,
    nome: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Bairros',
    schema: 'enderecos',
    tableName: 'bairros',
    timestamps: false,
  });
  return Bairros;
};