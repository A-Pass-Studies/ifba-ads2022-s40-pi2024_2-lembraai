'use strict';
/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pessoas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING
      },
      foto_perfil: {
        type: Sequelize.STRING
      },
      cpf: {
        type: Sequelize.STRING
      },
      sexo: {
        type: Sequelize.STRING
      },
      nascimento: {
        type: Sequelize.DATE
      },
      celular: {
        type: Sequelize.STRING
      },
      pessoa_endereco_id: {
        type: Sequelize.INTEGER
      },
      criado_em: {
        type: Sequelize.DATE
      },
      atualizado_em: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Pessoas');
  }
};