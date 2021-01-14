'use strict';

module.exports = function(sequelize, DataTypes){
  const plot = sequelize.define('plot', {
    plotNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    plotSize: {
      type: DataTypes.STRING,
      allowNull: false
    },
    plotuseId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    blockId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },{})
  plot.associate = function(models){
    plot.belongsTo(models.plotuse, {
      foreignKey: 'plotuseId'
    })
    plot.belongsTo(models.block, {
      foreignKey: 'blockId'
    })
    plot.belongsTo(models.status, {
      foreignKey: 'statusId'
    })
  }
  return plot;
};
