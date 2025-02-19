'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Logradouros extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Logradouros.init({
    bairro_id: DataTypes.INTEGER,
    nome: DataTypes.STRING,
    tipo: DataTypes.STRING,
    cep: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Logradouros',
    schema: 'enderecos',
    tableName: 'logradouros',
    timestamps: false
  });
  return Logradouros;
};