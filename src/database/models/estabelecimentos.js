'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Estabelecimentos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Estabelecimentos.init({
    foto_estabelecimento: DataTypes.STRING,
    logo_estabelcimento: DataTypes.STRING,
    descricao: DataTypes.TEXT,
    nome_comercial: DataTypes.STRING,
    endereco_id: DataTypes.INTEGER,
    atende_masculino: DataTypes.BOOLEAN,
    atende_feminio: DataTypes.BOOLEAN,
    criado_em: DataTypes.DATE,
    atualizado_em: DataTypes.DATE,
    pessoa_registrou_id: DataTypes.INTEGER,
    excluido_em: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Estabelecimentos',
    schema: 'servicos',
    tableName: 'estabelecimentos',
    createdAt: 'criado_em',
    updatedAt: 'atualizado_em'
  });
  return Estabelecimentos;
};