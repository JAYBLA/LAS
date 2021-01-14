'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('plots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      plotNumber: {
        type: Sequelize.STRING,
        allowNull: false
      },
      plotSize: {
        type: Sequelize.STRING,
        allowNull: false
      },
      plotuseId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'plotuses',
          key: 'id'
        }
      },
      blockId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'blocks',
          key: 'id'
        }
      },
      statusId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'statuses',
          key: 'id'
        }
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('plots');
  }
};
