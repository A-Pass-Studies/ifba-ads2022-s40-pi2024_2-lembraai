'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Agendamentos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Agendamentos.init({
    pessoa_profissional_id: DataTypes.INTEGER,
    servico_id: DataTypes.INTEGER,
    preco: DataTypes.DECIMAL,
    tempo_estimado_min: DataTypes.INTEGER,
    inicio_em: DataTypes.DATE,
    fim_em: DataTypes.DATE,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Agendamentos',
    schema: 'agendas',
    tableName: 'agendamentos',
    createdAt: 'criado_em',
    updatedAt: 'atualizado_em'
  });
  return Agendamentos;
};