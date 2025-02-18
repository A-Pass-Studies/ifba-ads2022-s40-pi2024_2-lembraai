'use strict';
import { Model, DataType } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Usuarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Usuarios.hasOne(models.Pessoas, {
        foreignKey: 'id'
      })
    }
  }
  Usuarios.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: DataTypes.STRING,
    senha: DataTypes.STRING,
    criado_em: DataTypes.DATE,
    atualizado_em: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Usuarios',
    schema: 'auth',
    tableName: 'usuarios',
    createdAt: 'criado_em',
    updatedAt: 'atualizado_em'
  });
  return Usuarios;
};