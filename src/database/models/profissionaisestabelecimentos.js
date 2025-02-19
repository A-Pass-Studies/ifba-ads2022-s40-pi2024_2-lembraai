'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class ProfissionaisEstabelecimentos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProfissionaisEstabelecimentos.init({
    pessoa_profissional_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    estabelecimento_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    dono: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'ProfissionaisEstabelecimentos',
    schema: 'servicos',
    tableName: 'profissionais_estabelecimentos',
    timestamps:false
  });
  ProfissionaisEstabelecimentos.removeAttribute('id');
  return ProfissionaisEstabelecimentos;
};