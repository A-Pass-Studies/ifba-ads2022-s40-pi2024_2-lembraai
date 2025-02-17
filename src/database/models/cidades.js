'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Cidades extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Cidades.init({
    nome: DataTypes.STRING,
    uf: DataTypes.STRING,
    cep_generico: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cidades',
    schema: 'enderecos',
    tableName: 'cidades'
  });
  return Cidades;
};