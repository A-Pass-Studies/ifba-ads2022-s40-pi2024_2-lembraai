'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes, Enderecos)  => {
  
  class Pessoas extends Model {
    
    static associate(models) {
      Pessoas.belongsTo(models.Usuarios, {
        foreignKey: 'id',
        allowNull: false
      });

      Pessoas.belongsTo(models.Enderecos, {
        foreignKey: 'endereco_id',
        allowNull: true
      });
    }
  }
  Pessoas.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    nome: DataTypes.STRING,
    foto_perfil: DataTypes.STRING,
    cpf: DataTypes.STRING,
    sexo: DataTypes.STRING,
    nascimento: DataTypes.DATE,
    celular: {
      type: DataTypes.STRING,
      allowNull: true
    },
    endereco_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Enderecos,
        allowNull: true,
        key: 'id'
      }
    },
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