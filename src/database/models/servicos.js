'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Servicos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Servicos.init({
    estabelecimento_id: DataTypes.INTEGER,
    nome: DataTypes.STRING,
    preco: DataTypes.DECIMAL,
    tempo_estimado_min: DataTypes.INTEGER,
    criado_em: DataTypes.DATE,
    atualizado_em: DataTypes.DATE,
    excluido_em: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Servicos',
    schema: 'servicos',
    tableName: 'servicos',
    createdAt: 'criado_em',
    updatedAt: 'atualizado_em'
  });
  return Servicos;
};