'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Enderecos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Enderecos.hasOne(models.Pessoas, {
        foreignKey: 'endereco_id'
      });

      Enderecos.hasOne(models.Estabelecimentos, {
        foreignKey: 'endereco_id'
      });
    }
  }
  Enderecos.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    logradouro_id: DataTypes.INTEGER,
    numero: DataTypes.INTEGER,
    complemento: DataTypes.STRING,
    referencia: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Enderecos',
    schema: 'enderecos',
    tableName: 'enderecos',
    timestamps: false
  });
  return Enderecos;
};