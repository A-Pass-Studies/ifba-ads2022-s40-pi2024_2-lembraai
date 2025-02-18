'use strict';
/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Agendamentos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pessoa_profissional_id: {
        type: Sequelize.INTEGER
      },
      servico_id: {
        type: Sequelize.INTEGER
      },
      preco: {
        type: Sequelize.DECIMAL
      },
      tempo_estimado_min: {
        type: Sequelize.INTEGER
      },
      inicio_em: {
        type: Sequelize.DATE
      },
      fim_em: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Agendamentos');
  }
};