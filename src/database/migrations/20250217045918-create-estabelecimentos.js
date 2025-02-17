'use strict';
/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Estabelecimentos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      foto_estabelecimento: {
        type: Sequelize.STRING
      },
      logo_estabelcimento: {
        type: Sequelize.STRING
      },
      descricao: {
        type: Sequelize.TEXT
      },
      nome_comercial: {
        type: Sequelize.STRING
      },
      endereco_id: {
        type: Sequelize.INTEGER
      },
      atende_masculino: {
        type: Sequelize.BOOLEAN
      },
      atende_feminio: {
        type: Sequelize.BOOLEAN
      },
      criado_em: {
        type: Sequelize.DATE
      },
      atualizado_em: {
        type: Sequelize.DATE
      },
      pessoa_registrou_id: {
        type: Sequelize.INTEGER
      },
      excluido_em: {
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
    await queryInterface.dropTable('Estabelecimentos');
  }
};