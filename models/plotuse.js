'use strict';

module.exports = function(sequelize, DataTypes){
  const plotuse = sequelize.define('plotuse', {
    plotUseName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },{})
  plotuse.associate = function(models){
    plotuse.hasMany(models.plot)
  }
  return plotuse;
};
