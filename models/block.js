
'use strict';

module.exports = function(sequelize, DataTypes){
  const block = sequelize.define('block', {
    blockName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    locationId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },{})
  block.associate = function (models){
    block.belongsTo(models.location, {
      foreignKey: 'locationId'
    })
    block.hasMany(models.plot)
  }
  return block;
};
