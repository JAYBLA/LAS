'use strict';
module.exports = function(sequelize, DataTypes){
  const location = sequelize.define('location', {
    locationName: {
      type: DataTypes.STRING,
      allowNull:false
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },{})
  location.associate = function(models){
    location.belongsTo(models.project, {
      foreignKey: 'projectId'
    })
    location.hasMany(models.block)
  }
  return location;
};
