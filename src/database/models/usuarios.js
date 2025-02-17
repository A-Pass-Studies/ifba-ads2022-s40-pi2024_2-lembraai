'use strict';
import { Model, DataTypes } from 'sequelize'

export default (sequelize) => {
  class Usuario extends Model {

    static associate(models) {
    }
  }
  Usuario.init({
    id: {primaryKey: true, type: DataTypes.INTEGER},
    email: DataTypes.STRING,
    senha: DataTypes.STRING,
    criado_em: DataTypes.STRING,
    atualizado_em: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Usuario',
    tableName: 'usuarios',
    schema: 'auth',
    timestamps: true,
    createdAt: 'criado_em',
    updatedAt: 'atualizado_em'
  });
  return Usuario;
};