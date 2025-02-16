'use strict';
import { Model, DataTypes } from 'sequelize'

export default (sequelize) => {
  class usuarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  usuarios.init({
    id: {primaryKey: true, type: DataTypes.INTEGER},
    email: DataTypes.STRING,
    senha: DataTypes.STRING,
    criado_em: DataTypes.STRING,
    atualizado_em: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'usuarios',
    schema: 'auth',
    timestamps: true,
    createdAt: 'criado_em',
    updatedAt: 'atualizado_em'
  });
  return usuarios;
};