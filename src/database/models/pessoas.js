'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Pessoas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pessoas.init({
    nome: DataTypes.STRING,
    foto_perfil: DataTypes.STRING,
    cpf: DataTypes.STRING,
    sexo: DataTypes.STRING,
    nascimento: DataTypes.DATE,
    celular: DataTypes.STRING,
    pessoa_endereco_id: DataTypes.INTEGER,
    criado_em: DataTypes.DATE,
    atualizado_em: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Pessoas',
    schema: 'dadoscadastrais',
    tableName: 'pessoas',
    createdAt: 'criado_em',
    updatedAt: 'atualizado_em'
  });
  return Pessoas;
};