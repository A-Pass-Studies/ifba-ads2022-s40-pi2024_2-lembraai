'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class PessoasJuridicas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PessoasJuridicas.init({
    pessoa_id: DataTypes.INTEGER,
    razao_social: DataTypes.STRING,
    cnpj: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PessoasJuridicas',
    schema: 'dadoscadastrais',
    tableName: 'pessoas_juridicas'
  });
  return PessoasJuridicas;
};