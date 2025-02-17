'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class HistoricoAgendamento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  HistoricoAgendamento.init({
    agendamento_id: DataTypes.INTEGER,
    status: DataTypes.STRING,
    comentario: DataTypes.STRING,
    data_hora: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'HistoricoAgendamento',
    schema: 'agendas',
    tableName: 'historico_agendamento'
  });
  return HistoricoAgendamento;
};