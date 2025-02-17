'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class ProfissionaisServicos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProfissionaisServicos.init({
    pessoa_id: DataTypes.INTEGER,
    estabelecimento_id: DataTypes.INTEGER,
    servico_estabelecimento_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProfissionaisServicos',
    schema: 'servicos',
    tableName: 'profissionais_servicos'
  });
  return ProfissionaisServicos;
};